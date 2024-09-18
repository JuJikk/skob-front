import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import React, { useState } from "react"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
}

const ShowStatisticsModal: React.FC<ModalWindowProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [isData] = useState(false)

  const handeClose = () => {
    onOpenChange()
  }

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={handeClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mx-auto pb-0">
          <span className="mb-4">
            В цьому місці будуть відображатися важливі досягнення та дати
          </span>
        </ModalHeader>
        <ModalFooter className="flex justify-center flex-col items-center pt-0">
          {isData ? (
            <>
              <div>Важливі дати:</div>
              <div>Вмілості:</div>
            </>
          ) : (
            <div>
              Тут поки нічого нема(
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ShowStatisticsModal
