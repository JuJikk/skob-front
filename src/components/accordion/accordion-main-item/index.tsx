import { useEffect, useState } from "react"
import AccordionItem from "../accordion-item"
import { Step } from "../../../types/accordion"

const mergeDataWithChecked = (data: any[], checked: any, probaType: string) => {
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
  const [isOpen, setIsOpen] = useState(false)
  const [combinedData, setCombinedData] = useState(() =>
    mergeDataWithChecked(step.data, step.checked, step.probaType)
  )

  useEffect(() => {
    setCombinedData(
      mergeDataWithChecked(step.data, step.checked, step.probaType)
    )
  }, [step.data, step.checked, step.probaType, currentProbaEmail])

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col border-b border-gray-200 w-full mx-auto">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span>{step.title}</span>
        <button>{isOpen ? "-" : "+"}</button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pl-8">
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
      </div>
    </div>
  )
}

export default AccordionMainItem
