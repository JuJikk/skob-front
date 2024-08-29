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
import * as Yup from "yup"
import { setUserSex } from "../../../lib/data"

interface GenderProps {
  isOpen: boolean
  onOpenChange: () => void
  userEmail: string | undefined
}

const validationSchema = Yup.object({
  sex: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Виберіть правильну стать")
    .required("Це поле є обов'язковим"),
})

const GenderModal: React.FC<GenderProps> = ({ isOpen, onOpenChange, userEmail }) => {
  const onSubmit = async (sex: string) => {
    console.log(sex)
    if (userEmail) {
      await setUserSex(userEmail, sex)
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
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values.sex)
            }}
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
