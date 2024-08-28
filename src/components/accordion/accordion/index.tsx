import React, { useState, useEffect, useCallback } from "react"
import { Step, UserData } from "../../../types/accordion"
import { markAllProba, useFindDataByEmail } from "../../../lib/data"
import {
  firstSample,
  secondSample,
  zeroSample,
} from "../../../utils/const/probas"
import AccordionMainItem from "../accordion-main-item"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSelectStore } from "../../../lib/contex/selectButton.tsx"
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Button, CircularProgress, useDisclosure } from "@nextui-org/react"
import ModalAllProba from "../../modal/modal-all-proba"
import { calculateCompletionPercentage } from "../../../lib/calculations"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface AccordionProps {
  user?: UserData
}

const AccordionComponent: React.FC<AccordionProps> = () => {
  const [steps, setSteps] = useState<Step[]>([])

  const { currentUserEmail, setCurrentUserEmail } = useSelectStore()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: userData, error: userError, isLoading } = useFindDataByEmail()

  useEffect(() => {
    if (userData && userData.length > 0 && !currentUserEmail) {
      setCurrentUserEmail(userData[0].email)
    }
  }, [userData, currentUserEmail, setCurrentUserEmail])

  const currentUserEmailToFetch = currentUserEmail || userData?.[0]?.email || ""

  const {
    data: currentUserData,
    isLoading: isUserLoading,
    error: userDataError,
    refetch,
  } = useQuery({
    queryKey: ["currentUserData", currentUserEmailToFetch],
    queryFn: async () => {
      const response = await axios.get(
        `${BACKEND_URL}/users/${currentUserEmailToFetch}`,
        {
          withCredentials: true,
        }
      )
      return response.data
    },
    enabled: !!currentUserEmailToFetch,
  })

  const refetchData = () => refetch()

  const loadUserData = useCallback(() => {
    if (currentUserData) {
      setSteps([
        {
          title: "Нульова проба",
          data: zeroSample,
          checked: currentUserData.zeroProba,
          probaType: "zeroProba",
        },
        {
          title: "Перша проба",
          data: firstSample,
          checked: currentUserData.firstProba,
          probaType: "firstProba",
        },
        {
          title: "Друга проба",
          data: secondSample,
          checked: currentUserData.secondProba,
          probaType: "secondProba",
        },
      ])
    }
  }, [currentUserData])

  useEffect(() => {
    loadUserData()
  }, [currentUserData, currentUserEmailToFetch])

  const handleModalConfirm = (probaName: string) => {
    markAllProba(currentUserEmailToFetch, probaName)
  }

  if (isLoading || isUserLoading) return "Завантажуємо проби..."
  if (userError || userDataError) return "An error has occurred."

  return (
    <>
      {userData?.length > 0 && (
        <div className="max-w-[70rem] mx-auto px-8">
          <ModalAllProba
            onConfirm={handleModalConfirm}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
          />
          <Button
            onClick={onOpen}
            className="border-black font-medium"
            variant="bordered"
          >
            Підписати цілу пробу
          </Button>
          <Accordion>
            {steps.map((step, index) => (
              <AccordionItem
                key={index}
                title={
                  <div className="flex justify-between items-center w-full rounded-t-lg">
                    <span className="text-2xl font-bold">{step.title}</span>
                    <CircularProgress
                      classNames={{
                        svg: "h-14 w-14",
                        indicator: "stroke-black",
                        track: "stroke-gray-300",
                        value: "text-xs font-semibold text-black",
                      }}
                      value={calculateCompletionPercentage(step)}
                      strokeWidth={4}
                      showValueLabel={true}
                    />
                  </div>
                }
              >
                <AccordionMainItem
                  refetchData={refetchData}
                  step={step}
                  currentProbaEmail={currentUserEmailToFetch}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  )
}

export default AccordionComponent
