import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react"
import React from "react"
import { ErrorMessage, Form, Formik } from "formik"
import { setUserSex } from "../../../lib/data"
import { validationGenderModalSchema } from "../../../utils/validation/yupSchemas.ts"

interface GenderModalProps {
  isOpen: boolean
  onOpenChange: () => void
  userEmail: string | undefined
}

const GenderModal: React.FC<GenderModalProps> = ({ isOpen, onOpenChange, userEmail }) => {
  const onSubmit = async (values: { sex: string }) => {
    if (userEmail) {
      await setUserSex(userEmail, values.sex)
    }
    onOpenChange()
  }

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Виберіть вашу стать
        </ModalHeader>
        <ModalBody>
          <p>Це потрібно для того щоб показувати вам правильну пробу</p>
          <Formik
            initialValues={{
              sex: "",
            }}
            validationSchema={validationGenderModalSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4 py-2">
                <Select
                  id="sex"
                  name="sex"
                  selectedKeys={[values.sex]}
                  label="Виберіть свою стать"
                  onChange={(e) => {
                    setFieldValue("sex", e.target.value)
                  }}
                  required
                >
                  <SelectItem key={"MALE"}>Чоловіча</SelectItem>
                  <SelectItem key={"FEMALE"}>Жіноча</SelectItem>
                </Select>
                <div className="h-[5px] !mt-0 !mb-2">
                  <ErrorMessage
                    component={"div"}
                    className="text-red-500 text-sm"
                    name={"sex"}
                  />
                </div>
                <Button
                  type="submit"
                  variant="solid"
                  className="bg-gray-900 font-bold w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
                >
                  Підтвердити
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GenderModal
