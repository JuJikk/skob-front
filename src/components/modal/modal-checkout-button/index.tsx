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
  pendingChecked: boolean | null
  errorMessage: string
}

const ModalCheckoutButton: React.FC<ModalWindowProps> = ({
  isOpen,
  onConfirm,
  onOpenChange,
  onLoading,
  isLoaded,
  pendingChecked,
  errorMessage,
}) => {
  const signProba = pendingChecked ? "Підписати" : "Відписати"

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col pb-0 items-center gap-1 mx-auto">
          {signProba} точку
          <div className="h-[1.5rem] flex items-start">
            {errorMessage && (
              <span className="text-danger text-sm font-normal">
                {errorMessage}
              </span>
            )}
          </div>
        </ModalHeader>
        <ModalFooter className="flex justify-center">
          <Button
            isLoading={onLoading}
            isDisabled={isLoaded}
            className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
            onPress={onConfirm}
          >
            {signProba}
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
