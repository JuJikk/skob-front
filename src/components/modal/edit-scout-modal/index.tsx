import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useUserStore } from "../../../lib/auth/useUser.ts"
import {
  editUserData,
  useFindAllData,
  useFindUserDataByEmail,
} from "../../../lib/data"
import React, { useState } from "react"
import { Formik, FormikHelpers } from "formik"
import EditForm from "./FormComp.tsx"
import { validationEditScoutSchema } from "../../../utils/validation/yupSchemas.ts"
import Loader from "../../common/loader"

interface ModalWindowProps {
  isOpen: boolean
  onOpenChange: () => void
}

interface FormValues {
  name: string
  sex: string
}

const ModalEditScout: React.FC<ModalWindowProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState("")
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))
  const { data: userData } = useFindAllData()

  const onConfirm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await editUserData(currentUserEmail, values.name, values.sex)
      setCurrentUserEmail("")
      setErrorMessage("")
      onOpenChange()
      actions.setSubmitting(false)
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserEmail(e.target.value)
  }

  const handeClose = () => {
    setErrorMessage("")
    setCurrentUserEmail("")
    onOpenChange()
  }

  const { data: currentUserData, isLoading: isUserLoading } =
    useFindUserDataByEmail(currentUserEmail)

  const whosText = !currentUserEmail ? "чиї" : "які"

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={handeClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mx-auto pb-0">
          <span className="mb-4">Виберіть {whosText} дані ви хочете змінити</span>
        </ModalHeader>
        <ModalFooter className="flex justify-center flex-col items-center pt-0">
          {!currentUserEmail ? (
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
                onPress={handeClose}
              >
                {user?.sex === "MALE" ? "Я передумав" : "Я передумала"}
              </Button>
            </>
          ) : isUserLoading ? (
            <Loader label="Завантаження..." />
          ) : (
            <Formik
              initialValues={{
                name: currentUserData?.name || "",
                sex: currentUserData?.sex || "MALE",
              }}
              validationSchema={validationEditScoutSchema}
              onSubmit={onConfirm}
            >
              {({ setFieldValue, values }) => (
                <>
                  <EditForm
                    values={values}
                    setFieldValue={setFieldValue}
                    onOpenChange={onOpenChange}
                    setCurrentUserEmail={setCurrentUserEmail}
                  />
                  <div className="h-[1.5rem]">
                    {errorMessage && (
                      <span className="text-danger text-medium font-normal my-1">
                     {errorMessage}
                    </span>
                    )}
                  </div>
                </>
              )}
            </Formik>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditScout
