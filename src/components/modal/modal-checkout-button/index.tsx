import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import React from "react"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
  onConfirm: () => void
  onLoading: boolean
  isLoaded: boolean
}

const ModalCheckoutButton: React.FC<ModalWindowProps> = ({
  isOpen,
  onConfirm,
  onOpenChange,
  onLoading,
  isLoaded,
}) => {
  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mx-auto">
          Підписати точку
        </ModalHeader>
        <ModalFooter className="flex justify-center">
          <Button
            isLoading={onLoading}
            isDisabled={isLoaded}
            className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
            onPress={onConfirm}
          >
            Підписати
          </Button>
          <Button
            variant="bordered"
            className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
            onPress={onOpenChange}
            isDisabled={onLoading}
          >
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCheckoutButton
