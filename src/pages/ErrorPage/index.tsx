import { useNavigate } from "react-router-dom"
import { Button } from "@nextui-org/react"

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen">
      <span className="text-center text-2xl mb-6 font-bold">Ой лишенько, схоже ви потрапили не на ту сторінку(</span>
      <Button
        onClick={() => {
          navigate("/")
        }}
        variant="bordered"
        className="bg-white h-12 text-gray-900 text-base font-bold border-gray-900 rounded-xl"
      >
        Нажміть сюди щоб повернутись назад
      </Button>
    </div>
  )
}

export default ErrorPage
