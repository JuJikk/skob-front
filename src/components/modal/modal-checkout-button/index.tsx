import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import React, { useState } from "react"
import { updateProbaStatus } from "../../../lib/data"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ModalWindowProps } from "../../../types/modals.ts"

const ModalCheckoutButton: React.FC<ModalWindowProps> = ({
  isOpen,
  onOpenChange,
  pendingChecked,
  pendingIndex,
  currentProbaEmail,
  currentStep,
  item,
  setIndexesSum,
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const signProba = pendingChecked ? "Підписати" : "Відписати"
  const queryClient = useQueryClient()

  const handleMutation = useMutation({
    mutationFn: () => {
      return updateProbaStatus(
        currentProbaEmail,
        item.probaType,
        currentStep,
        pendingIndex,
        pendingChecked ? 1 : 0
      )
    },
    onSuccess: () => {
      item.checked[pendingIndex] = pendingChecked ? 1 : 0
      setIndexesSum(item.checked.reduce((acc, num) => acc + num, 0))
      onOpenChange()
      setIsLoading(false)
      queryClient.invalidateQueries({
        queryKey: ["currentUserData"],
      })
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const errorMessage = error.response.data.message
      setIsLoading(false)
      if (Array.isArray(errorMessage)) {
        setErrorMessage(errorMessage[0])
      } else {
        setErrorMessage(errorMessage)
      }
    },
  })

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
            isLoading={isLoading}
            isDisabled={isLoading}
            className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
            onPress={() => {
              setIsLoading(true)
              handleMutation.mutate()
            }}
          >
            {signProba}
          </Button>
          <Button
            variant="bordered"
            className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
            onPress={onOpenChange}
            isDisabled={isLoading}
          >
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCheckoutButton
