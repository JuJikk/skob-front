import { Button } from "@nextui-org/react"
import { Google } from "@medusajs/icons"

const LoginPage: React.FC = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src="../../../public/logo.svg" alt="logo" />
          <p className="mt-4 text-4xl font-bold">Вітаємо!</p>
          <p className="font-extralight text-sm my-4">
            Увійдіть, щоб продовжити
          </p>
        </div>

        <a href="http://localhost:3000/auth/google">
          <Button
            variant="bordered"
            className="bg-white font-bold text-base text-gray-900 px-8 mt-4 w-full rounded-xl border-gray-900 border-2"
            size="lg">
            Продовжуйте з Google <Google />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default LoginPage
