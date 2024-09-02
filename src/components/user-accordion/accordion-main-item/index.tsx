import { useEffect, useState } from "react"
import { Step } from "../../../types/accordion"
import { mergeDataWithChecked } from "../../../lib/merge-data"
import AccordionItem from "../accordion-item"

const AccordionMainItem = ({
  step,
  currentProbaEmail,
}: {
  step: Step
  currentProbaEmail: string
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
