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
  const [errorMessage, setErrorMessage] = useState("")

  const onConfirm = async () => {
    try {
      await markAllProba(userEmail, probaToMark)
      onOpenChange()
      setErrorMessage("")
      refetchData()
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const errorMessage = e.response.data.message
      if (Array.isArray(errorMessage)) {
        setErrorMessage(errorMessage[0])
      } else {
        setErrorMessage(errorMessage)
      }
    }
  }

  const handleClose = () => {
    onOpenChange()
    setErrorMessage("")
  }

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col pb-0 gap-1 mx-auto">
          <span className="mb-4">Яку пробу ти хочеш підписати?</span>
          <Select
            placeholder="Виберіть пробу"
            selectionMode="single"
            className="max-w-xs"
            aria-label="Choose proba"
            onChange={(e) => setProbaToMark(e.target.value)}
          >
            <SelectItem key="zeroProba">Нульва проба</SelectItem>
            <SelectItem key="firstProba">Перша проба</SelectItem>
            <SelectItem key="secondProba">Друга проба</SelectItem>
          </Select>
          <div className="h-[1.5rem] flex items-start">
            {errorMessage && (
              <span className="text-danger text-sm font-normal">{errorMessage}</span>
            )}
          </div>
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
