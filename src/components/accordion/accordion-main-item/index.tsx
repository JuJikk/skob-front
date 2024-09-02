import { useEffect, useState } from "react"
import AccordionItem from "../accordion-item"
import { Step } from "../../../types/accordion"
import { mergeDataWithChecked } from "../../../lib/merge-data"

const AccordionMainItem = ({
  step,
  currentProbaEmail,
  refetchData,
}: {
  step: Step
  currentProbaEmail: string
  refetchData: () => void
}) => {
  const [combinedData, setCombinedData] = useState(() =>
    mergeDataWithChecked(step.data, step.checked, step.probaType)
  )

  useEffect(() => {
    setCombinedData(
      mergeDataWithChecked(step.data, step.checked, step.probaType)
    )
  }, [step.data, step.checked, step.probaType, currentProbaEmail])

  return (
    <div>
      {combinedData.map((obj, index) => (
        <AccordionItem
          refetchData={refetchData}
          item={obj}
          key={index}
          currentProbaEmail={currentProbaEmail}
          currentStep={Object.keys(step.checked)[index]}
        />
      ))}
    </div>
  )
}

export default AccordionMainItem
