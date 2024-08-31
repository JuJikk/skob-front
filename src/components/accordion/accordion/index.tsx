import React, { useState, useEffect, useCallback } from "react"
import { Step } from "../../../types/accordion"
import { useFindDataByEmail, useFindUserDataByEmail } from "../../../lib/data"
import AccordionMainItem from "../accordion-main-item"
import { useSelectStore } from "../../../lib/contex/selectButton.tsx"
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { CircularProgress } from "@nextui-org/react"
import { useCompletionPercentages } from "../../../lib/calculations"
import { loadUserData } from "../../../lib/user-data-generator"
import ModalAllProba from "../../modal/modal-all-proba"
import { useModalStore } from "../../../lib/contex/SignAllProbaModal.tsx"

const AccordionComponent: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([])
  const { currentUserEmail, setCurrentUserEmail } = useSelectStore()
  const { data: userData, error: userError, isLoading } = useFindDataByEmail()
  const { isOpen, closeModal, setRefetchData } = useModalStore()

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
  } = useFindUserDataByEmail(currentUserEmailToFetch)

  const handleLoadUserData = useCallback(() => {
    const loadedSteps = loadUserData({ currentUserData })
    setSteps(loadedSteps)
  }, [currentUserData])

  useEffect(() => {
    handleLoadUserData()
  }, [currentUserData, currentUserEmailToFetch, handleLoadUserData])

  useEffect(() => {
    setRefetchData(refetch)
  }, [refetch, setRefetchData])

  const percentages = useCompletionPercentages(steps)
  if (isLoading || isUserLoading) return "Завантажуємо проби..."
  if (userError || userDataError) return "An error has occurred."

  return (
    <>
      {userData?.length > 0 && (
        <div className="max-w-[70rem] mx-auto px-8">
          <ModalAllProba
            onOpenChange={closeModal}
            isOpen={isOpen}
            userEmail={currentUserEmailToFetch}
            refetchData={refetch}
          />
          <Accordion>
            {steps.map((step, index) => (
              <AccordionItem
                className="text-2xl font-bold"
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
                      value={percentages[index]}
                      strokeWidth={4}
                      showValueLabel={true}
                    />
                  </div>
                }
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
