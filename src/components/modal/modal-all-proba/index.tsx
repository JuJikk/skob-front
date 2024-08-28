import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useState } from "react"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
  onConfirm: (probaName: string) => void
}

const ModalAllProbaButton: React.FC<ModalWindowProps> = ({
  isOpen,
  onConfirm,
  onOpenChange,
}) => {
  const [probaToMark, setProbaToMark] = useState("")
  const onPress = () => {
    onOpenChange()
    onConfirm(probaToMark)
  }

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
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
        </ModalHeader>
        <ModalFooter className="flex justify-center">
          <Button
            className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
            onPress={onPress}
          >
            Так!
          </Button>
          <Button
            variant="bordered"
            className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
            onPress={onOpenChange}
          >
            Ні
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAllProbaButton
