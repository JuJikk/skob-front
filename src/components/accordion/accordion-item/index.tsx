import React, { useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import ModalCheckoutButton from "../../modal/modal-checkout-button"
import { Props } from "../../../types/accordion.ts"
import { Checkbox, useDisclosure } from "@nextui-org/react"
import { CaretDown } from "@phosphor-icons/react"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const AccordionItem = ({ item, currentProbaEmail, currentStep, refetchData }: Props) => {
  const [openLoader, setOpenLoader] = useState(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [indaxesSum, setIndaxesSum] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [pendingChecked, setPendingChecked] = useState<boolean | null>(null)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    const count = () => item.checked.reduce((acc, num) => acc + num, 0)
    setIndaxesSum(count)
  }, [item.checked])

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  const mutation = useMutation({
    mutationFn: ({ probaName, probaSubName, probaIndex, value }: any) => {
      return axios.patch(
        `${BACKEND_URL}/probas/${currentProbaEmail}`,
        {
          probaName,
          probaSubName,
          probaIndex,
          value,
        },
        { withCredentials: true }
      )
    },
    onSuccess: (_data, variables) => {
      item.checked[variables.index] = variables.value
      const newSum = item.checked.reduce((acc, num) => acc + num, 0)
      setIndaxesSum(newSum)
      refetchData()
    },
    onError: (error) => {
      console.error("Error updating checked status:", error)
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
      mutation.mutate(
        {
          probaName: item.probaType,
          probaSubName: currentStep,
          probaIndex: pendingIndex,
          value: pendingChecked ? 1 : 0,
        },
        {
          onSettled: () => {
            setPendingIndex(null)
            setPendingChecked(null)
            onOpenChange()
            setOpenLoader(false)
          },
        }
      )
    }
  }

  return (
    <div className="flex flex-col border-b border-gray-200 w-[95%] mx-auto">
      <ModalCheckoutButton
        onLoading={openLoader}
        onConfirm={handleModalConfirm}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-base font-medium md:font-semibold">
          {item.section} ({indaxesSum} / {item.items.length})
        </span>
        <button
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
              <li className={`text-base mb-2 font-normal ${item.checked[index] ? "text-[#A1A1AA] line-through" : ""}`}>
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
