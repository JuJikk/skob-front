import React, { useEffect, useRef, useState } from "react"
import { Checkbox, useDisclosure } from "@nextui-org/react"
import { CaretDown } from "@phosphor-icons/react"
import ModalCheckoutButton from "../../modal/modal-checkout-button"
import { Props } from "../../../types/accordion.ts"

const AccordionItem = ({
  item,
  currentProbaEmail,
  currentStep,
  refetchData,
}: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [indexesSum, setIndexesSum] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [pendingChecked, setPendingChecked] = useState<boolean | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    setIndexesSum(item.checked.reduce((acc, num) => acc + num, 0))
  }, [item.checked])

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPendingIndex(index)
      setPendingChecked(e.target.checked)
      onOpen()
    }

  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen)

  return (
    <div className="flex flex-col w-[95%] mx-auto">
      <ModalCheckoutButton
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        refetchData={refetchData}
        currentStep={currentStep}
        currentProbaEmail={currentProbaEmail}
        item={item}
        pendingIndex={pendingIndex}
        pendingChecked={pendingChecked}
        setIndexesSum={setIndexesSum}
      />
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-base font-medium md:font-semibold">
          {item.section} ({indexesSum} / {item.items.length})
        </span>
        <button
          aria-label="toggle button"
          className={`transition-transform duration-300 ${
            isAccordionOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <CaretDown className="size-4" />
        </button>
      </div>
      <div
        ref={descriptionRef}
        className={`overflow-auto transition-all duration-200 ease-in-out ${
          isAccordionOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ol>
          {item.items.map((subItem, index) => (
            <li key={index} className="flex">
              <Checkbox
                onChange={handleCheckboxChange(index)}
                isSelected={!!item.checked[index]}
                className="mb-auto mr-0.5"
                color="default"
                type="checkbox"
              />
              <span
                className={`text-base mb-2 font-normal ${
                  item.checked[index] ? "text-[#A1A1AA] line-through" : ""
                }`}
              >
                {index + 1}. {subItem}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default AccordionItem
