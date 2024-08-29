import {
  Button,
  Input,
  Modal, ModalHeader, ModalBody, ModalContent,
} from "@nextui-org/react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { addUser } from "../../../lib/data"

interface ModalWindowProps {
  onOpenChange: () => void
  isOpen: boolean
}

const ModalWindow: React.FC<ModalWindowProps> = ({ onOpenChange, isOpen }) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Неправильний формат електронної пошти")
      .required("Електронна пошта обов'язкова"),
  })

  const handleSubmit = (values: { email: string }) => {
    addUser(values.email).then(() => onOpenChange())
  }

  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex gap-3">
          <p className="text-3xl mt-2 font-bold">Добавте юнака</p>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values }) => (
              <Form className="flex flex-col gap-4">
                <Field
                  name="email"
                  as={Input}
                  inputMode="email"
                  size="md"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  label="Пошта"
                  placeholder="Введіть електронну пошту"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
                <div className="flex justify-between flex-col gap-3 md:flex-row">
                  <Button
                    type="submit"
                    variant="solid"
                    className="bg-gray-900 font-bold w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
                  >
                    Додати юнака
                  </Button>
                  <Button
                    onClick={onOpenChange}
                    variant="bordered"
                    className="bg-white mb-4 text-gray-900 w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
                  >
                    Повернутися назад
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWindow
