import React, { useState, useEffect, useCallback } from "react"
import { Step } from "../../../types/accordion"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { loadUserData } from "../../../lib/user-data-generator"
import AccordionMainItem from "../accordion-main-item"
import Loader from "../../common/loader"
import ErrorMessage from "../../common/error-message"
import NextSteps from "../../common/next-steps-message"
import { CircularProgress } from "@nextui-org/react"
import { useCompletionPercentages } from "../../../lib/calculations"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const AccordionUserComponent: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([])

  const {
    data: currentUserData,
    isLoading: isUserLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ["currentUserData"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/users/me`, {
        withCredentials: true,
      })
      return response.data
    },
  })

  const handleLoadUserData = useCallback(() => {
    const loadedSteps = loadUserData({ currentUserData });
    setSteps(loadedSteps);
  }, [currentUserData])

  useEffect(() => {
    handleLoadUserData()
  }, [currentUserData, handleLoadUserData])

  const percentages = useCompletionPercentages(steps);

  if (isUserLoading) return <Loader label="Завантажуємо пробу..." />
  if (userDataError) return <ErrorMessage/>
  if (!currentUserData.ownerEmail) return <NextSteps sex={currentUserData.sex}/>

  return (
    <>
      <div className="max-w-[70rem] mx-auto px-8">
        <Accordion>
          {steps.map((step, index) => (
            <AccordionItem
              className="text-2xl font-bold"
              aria-label="proba name"
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
                    aria-label="progress"
                  />
                </div>
              }
            >
              <AccordionMainItem
                step={step}
                currentProbaEmail={currentUserData.email}
              />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}

export default AccordionUserComponent
