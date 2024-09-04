import { Button } from "@nextui-org/react"

const ErrorMessage = () => {

  return (
    <div className="max-w-[68rem] flex items-center justify-center flex-col mx-auto w-[90%]">
      <span className="text-center text-2xl font-bold">
        Трясця, щось пішло не так
      </span>{" "}
      <span className="text-center text-2xl font-bold">
        Попробуйте перезавантажити сторінку
      </span><span className="text-center text-2xl mb-6 font-bold">
        Або ж натисніть на кнопку
      </span>
      <Button
        variant="bordered"
        className="bg-white h-12 text-gray-900 text-base font-bold border-gray-900 rounded-xl"
      >
        Кнопка
      </Button>
    </div>
  )
}

export default ErrorMessage
