import React, { useState } from "react"
import { Input, Button, Select, SelectItem } from "@nextui-org/react"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { registrationSchema } from "../../types/yupSchemas.ts"
import { signUp } from "../../lib/auth/userActions.ts"

const SignUp: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const navigate = useNavigate()

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    sex: string
  ) => {
    try {
      await signUp(name, email, password, sex)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src="../../../public/logo.svg" alt="logo" />
          <p className="mt-4 text-4xl font-bold">Ласкаво просимо!</p>
          <p className="font-extralight text-sm mt-4">
            Зареєструйтесь, щоб продовжити
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            sex: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={(values) => {
            handleSignUp(values.name, values.email, values.password, values.sex)
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="mt-8">
              <Field
                as={Input}
                id="email"
                name="email"
                label="Введіть електронну пошту"
                required
              />
              <div className="h-[5px] !mt-0 !mb-6">
                <ErrorMessage
                  component={"div"}
                  className="text-red-500 texs-sm"
                  name={"email"}
                />
              </div>
              <Field
                as={Input}
                id="name"
                name="name"
                label="Введіть прізвище та ім'я"
                required
              />
              <div className="h-[5px] !mt-0 !mb-6">
                <ErrorMessage
                  component={"div"}
                  className="text-red-500 texs-sm"
                  name={"name"}
                />
              </div>
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
              <div className="h-[5px] !mt-0 !mb-6">
                <ErrorMessage
                  component={"div"}
                  className="text-red-500 texs-sm"
                  name={"sex"}
                />
              </div>
              <Field
                as={Input}
                id="password"
                name="password"
                label="Введіть пароль"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <Eye className="text-2xl pointer-events-none" />
                    ) : (
                      <EyeSlash className="text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isPasswordVisible ? "text" : "password"}
                className="text-gray-900"
                required
              />
              <div className="h-[5px] !mt-0 !mb-8">
                <ErrorMessage
                  component={"div"}
                  className="text-red-500 texs-sm"
                  name={"password"}
                />
              </div>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                label="Введіть повторно пароль"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isConfirmPasswordVisible ? (
                      <Eye className="text-2xl pointer-events-none" />
                    ) : (
                      <EyeSlash className="text-2xl pointer-events-none" />
                    )}
                  </button>
                }
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="text-gray-900"
                required
              />
              <div className="h-[5px] !mt-0 !mb-6">
                <ErrorMessage
                  component={"div"}
                  className="text-red-500 texs-sm"
                  name={"confirmPassword"}
                />
              </div>

              <Button
                type="submit"
                variant="solid"
                className="bg-gray-900 font-bold text-base text-white px-8 w-full rounded-xl"
                size="lg"
              >
                Зареєструватися
              </Button>
            </Form>
          )}
        </Formik>

        <a href="http://localhost:3000/auth/google">
          <Button
            variant="solid"
            className="bg-gray-900 font-bold text-base text-white px-8 w-full rounded-xl"
            size="lg">
            Увійти через гугл
          </Button>
        </a>

        <div className="mt-4 text-center">
          <p className="text-lg font-light">
            Не маєте облікового запису?{" "}
            <a
              href="/login"
              className="text-black font-bold cursor-pointer underline"
            >
              Увійти
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
