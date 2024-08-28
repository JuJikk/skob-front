import React, { useState, useEffect, useCallback } from "react"
import { Step, UserData } from "../../../types/accordion"
import { useFindDataByEmail } from "../../../lib/data"
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
import { Button, useDisclosure } from "@nextui-org/react"
import ModalAllProba from "../../modal/modal-all-proba"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

interface AccordionProps {
  user?: UserData
}

const AccordionComponent: React.FC<AccordionProps> = () => {
  const [steps, setSteps] = useState<Step[]>([])
  const [rerenderState, setRerenderState] = useState(0)

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
    enabled: !!currentUserEmailToFetch || !!rerenderState,
  })

  const rerender = () => setRerenderState((prev) => prev + 1)

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
  }, [currentUserData, currentUserEmailToFetch, rerenderState])

  if (isLoading || isUserLoading) return "Завантажуємо проби..."
  if (userError || userDataError) return "An error has occurred."

  return (
    <>
      {userData?.length > 0 && (
        <div className="max-w-[70rem] mx-auto px-8">
          <ModalAllProba
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            userEmail={currentUserEmailToFetch}
            refetchData={rerender}
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
                className="text-2xl font-bold"
                key={index}
                title={step.title}
              >
                <AccordionMainItem
                  refetchData={refetch}
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
