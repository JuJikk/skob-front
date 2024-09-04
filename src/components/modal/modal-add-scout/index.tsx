import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
} from "@nextui-org/react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { addUser } from "../../../lib/data"
import { validationSchemaAddUser } from "../../../utils/validation/yupSchemas.ts"
import { useState } from "react"

interface ModalWindowProps {
  onOpenChange: () => void
  isOpen: boolean
}

const ModalWindow: React.FC<ModalWindowProps> = ({ onOpenChange, isOpen }) => {
  const [errorMessage, setErrorMessage] = useState("")
  const handleSubmit = async (values: { email: string }) => {
    try {
      await addUser(values.email)
      onOpenChange()
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
    setErrorMessage("")
    onOpenChange()
  }

  return (
    <>
      <Modal placement="center" isOpen={isOpen} onOpenChange={handleClose}>
        <ModalContent>
          <ModalHeader className="flex gap-3">
            <p className="text-3xl mt-2 font-bold">Добавте юнака</p>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchemaAddUser}
              onSubmit={handleSubmit}
            >
              {({ handleChange, values }) => (
                <Form className="flex flex-col">
                  <Field
                    name="email"
                    as={Input}
                    inputMode="email"
                    size="md"
                    value={values.email}
                    onChange={(values: { email: string }) => {
                      handleChange(values)
                      setErrorMessage("")
                    }}
                    type="email"
                    label="Пошта"
                    placeholder="Введіть електронну пошту"
                  />
                  <div className="h-[1.5rem] mt-1 mb-2">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 inline text-sm"
                    />
                    {errorMessage && (
                      <span className="text-danger text-sm">{errorMessage}</span>
                    )}
                  </div>
                  <div className="flex justify-between flex-col gap-3 md:flex-row">
                    <Button
                      type="submit"
                      variant="solid"
                      className="bg-gray-900 font-bold w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
                    >
                      Додати юнака
                    </Button>
                    <Button
                      onClick={handleClose}
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
    </>
  )
}

export default ModalWindow
