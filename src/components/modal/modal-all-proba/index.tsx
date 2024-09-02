import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { markAllProba } from "../../../lib/data"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
  userEmail: string
  refetchData: () => void
}

const ModalAllProbaButton: React.FC<ModalWindowProps> = ({
  isOpen,
  onOpenChange,
  userEmail,
  refetchData,
}) => {
  const [probaToMark, setProbaToMark] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const onConfirm = async () => {
    try {
      await markAllProba(userEmail, probaToMark)
      onOpenChange()
      refetchData()
    } catch {
      setShowErrorMessage(true)
    }
  }

  const handleClose = () => {
    onOpenChange()
    setShowErrorMessage(false)
  }

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mx-auto">
          <span className="mb-4">Яку пробу ти хочеш підписати?</span>
          <Select
            placeholder="Виберіть пробу"
            selectionMode="single"
            className="max-w-xs"
            onChange={(e) => {
              setProbaToMark(e.target.value)
            }}
          >
            <SelectItem key="zeroProba">Нульва проба</SelectItem>
            <SelectItem key="firstProba">Перша проба</SelectItem>
            <SelectItem key="secondProba">Друга проба</SelectItem>
          </Select>
          {showErrorMessage && (
            <span className="text-danger text-medium font-normal my-1">Ви не можете підписати цю пробу не завершивши попередню</span>
          )}
        </ModalHeader>
        <ModalFooter className="flex justify-center pt-0">
          <Button
            className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
            onPress={onConfirm}
          >
            Підписати!
          </Button>
          <Button
            variant="bordered"
            className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
            onPress={handleClose}
          >
            Вже не хочу
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAllProbaButton
