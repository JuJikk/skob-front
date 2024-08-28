import { useEffect, useState } from "react"
import AccordionItem from "../accordion-item"
import { ProbaData, Step } from "../../../types/accordion"

type mergeDataProps = {
  items: string[]
  section: string
}

const mergeDataWithChecked = (
  data: mergeDataProps[],
  checked: ProbaData,
  probaType: string
) => {
  return data.map((sectionObj, index) => {
    const sectionKey = String.fromCharCode(97 + index)
    return {
      section: sectionObj.section,
      items: sectionObj.items,
      checked: checked[sectionKey],
      probaType,
    }
  })
}

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
