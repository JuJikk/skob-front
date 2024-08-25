import React, { useState } from "react"
import { Input, Button } from "@nextui-org/react"
import { Eye, EyeSlash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { Field, Form, Formik } from "formik"
import { logIn } from "../../lib/auth/userActions.ts"

const LoginPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()

  const handleLogIn = async (email: string, password: string) => {
    try {
      await logIn(email, password)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src="../../../public/logo.svg" alt="logo" />
          <p className="mt-4 text-4xl font-bold">З поверненням!</p>
          <p className="font-extralight text-sm my-4">
            Ласкаво просимо назад! Увійдіть, щоб продовжити
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values)
            handleLogIn(values.email, values.password)
          }}
        >
          <Form className="space-y-4">
            <Field
              as={Input}
              label="Введіть електронну пошту"
              id="email"
              name="email"
              required
            />
            <Field
              as={Input}
              label="Введіть пароль"
              id="password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <Eye className="text-2xl pointer-events-none" />
                  ) : (
                    <EyeSlash className="text-2xl pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              name="password"
              className="text-gray-900"
              required
            />

            <Button
              type="submit"
              variant="solid"
              className="bg-gray-900 font-bold text-base text-white px-8 w-full rounded-xl"
              size="lg"
            >
              Увійти
            </Button>
          </Form>
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-lg font-light">
            Не маєте облікового запису?{" "}
            <a
              href="/signup"
              className="text-black font-bold cursor-pointer underline"
            >
              Зареєструйтеся
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
