import React, { useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Checkbox, useDisclosure } from "@nextui-org/react"
import { CaretDown } from "@phosphor-icons/react"
import ModalCheckoutButton from "../../modal/modal-checkout-button"
import { Props } from "../../../types/accordion.ts"
import { updateProbaStatus } from "../../../lib/data"

const AccordionItem = ({
  item,
  currentProbaEmail,
  currentStep,
  refetchData,
}: Props) => {
  const [openLoader, setOpenLoader] = useState(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [indexesSum, setIndexesSum] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [pendingChecked, setPendingChecked] = useState<boolean | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    setIndexesSum(item.checked.reduce((acc, num) => acc + num, 0))
  }, [item.checked])

  const mutation = useMutation({
    mutationFn: ({
      probaName,
      probaSubName,
      probaIndex,
      value,
    }: {
      probaName: string
      probaSubName: string
      probaIndex: number
      value: number
    }) =>
      updateProbaStatus(
        currentProbaEmail,
        probaName,
        probaSubName,
        probaIndex,
        value
      ),
    onSuccess: (_data, variables) => {
      item.checked[variables.probaIndex] = variables.value
      setIndexesSum(item.checked.reduce((acc, num) => acc + num, 0))
      refetchData()
      onOpenChange()
    },
    onError: (error) => {
      console.error("Error updating checked status:", error)
    },
    onSettled: () => {
      setOpenLoader(false)
    },
  })

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPendingIndex(index)
      setPendingChecked(e.target.checked)
      onOpen()
    }

  const handleModalConfirm = () => {
    if (pendingIndex !== null && pendingChecked !== null) {
      setOpenLoader(true)
      mutation.mutate({
        probaName: item.probaType,
        probaSubName: currentStep,
        probaIndex: pendingIndex,
        value: pendingChecked ? 1 : 0,
      })
    }
  }

  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen)

  return (
    <div className="flex flex-col border-b border-gray-200 w-[95%] mx-auto">
      <ModalCheckoutButton
        onLoading={openLoader}
        onConfirm={handleModalConfirm}
        onOpenChange={() => {
          if (!openLoader) {
            onOpenChange()
          }
        }}
        isOpen={isOpen}
        isLoaded={openLoader}
      />
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-base font-medium md:font-semibold">
          {item.section} ({indexesSum} / {item.items.length})
        </span>
        <button
          aria-label={isAccordionOpen ? "Collapse" : "Expand"}
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
        <ol className="list-decimal list-inside">
          {item.items.map((subItem, index) => (
            <div key={index} className="flex">
              <Checkbox
                onChange={handleCheckboxChange(index)}
                isSelected={!!item.checked[index]}
                className="mb-auto mr-0.5"
                color="default"
                type="checkbox"
              />
              <li
                className={`text-base mb-2 font-normal ${
                  item.checked[index] ? "text-[#A1A1AA] line-through" : ""
                }`}
              >
                {subItem}
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default AccordionItem
