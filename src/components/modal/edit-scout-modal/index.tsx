import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { editUserData, useFindDataByEmail, useFindUserDataByEmail } from "../../../lib/data"
import React, { useState } from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
}

const ModalEditScout: React.FC<ModalWindowProps> = ({ isOpen, onOpenChange }) => {
  const [currentUserEmail, setCurrentUserEmail] = useState("")
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))
  const { data: userData } = useFindDataByEmail()

  const validationSchema = Yup.object({
    sex: Yup.string()
      .oneOf(["MALE", "FEMALE"], "Виберіть правильну стать")
      .required("Це поле є обов'язковим"),
    name: Yup.string().required("Це поле є обов'язковим"),
  })

  const onConfirm = async (name: string, sex: string) => {
    await editUserData(currentUserEmail, name, sex)
    setCurrentUserEmail("")
    onOpenChange()
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentUserEmail(e.target.value)
  }

  const { data: currentUserData, isLoading: isUserLoading } = useFindUserDataByEmail(currentUserEmail)

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mx-auto pb-0">
          <span className="mb-4">Виберіть кого дані ви хочете змінити</span>
        </ModalHeader>
        <ModalFooter className="flex justify-center flex-col items-center pt-0">
          {currentUserEmail === "" ? (
            <>
              <Select
                label="Виберіть користувача"
                onChange={handleSelectChange}
                className="p-2 max-w-60 rounded-md"
                size="sm"
              >
                {userData?.map((user: { email: string; name: string }) => (
                  <SelectItem key={user.email} value={user.email}>
                    {user.name}
                  </SelectItem>
                ))}
              </Select>
              <Button
                variant="bordered"
                className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl mt-4"
                onPress={onOpenChange}
              >
                {user?.sex === "MALE" ? "Я передумав" : "Я передумала"}
              </Button>
            </>
          ) : isUserLoading ? (
            <div>Завантаження...</div>
          ) : (
            <Formik
              initialValues={{
                name: currentUserData?.name || "",
                sex: currentUserData?.sex || "MALE",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onConfirm(values.name, values.sex)
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="space-y-4 w-full">
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    label="Введіть прізвище та ім'я"
                    required
                  />
                  <Select
                    id="sex"
                    name="sex"
                    selectedKeys={[values.sex]}
                    label="Виберіть свою стать"
                    onChange={(e) => setFieldValue("sex", e.target.value)}
                    required
                  >
                    <SelectItem key="MALE" value="MALE">
                      Чоловіча
                    </SelectItem>
                    <SelectItem key="FEMALE" value="FEMALE">
                      Жіноча
                    </SelectItem>
                  </Select>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      type="submit"
                      className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
                    >
                      Змінити
                    </Button>
                    <Button
                      variant="bordered"
                      className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
                      onPress={() => {
                        setCurrentUserEmail("")
                        onOpenChange()
                      }}
                    >
                      Скасувати
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditScout
