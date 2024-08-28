import { useState } from "react"
import ModalWindow from "../modal-window"
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { PlusCircle } from "@phosphor-icons/react"

const ModalButton = () => {
  const [modal, setModal] = useState(false)
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))
  if (user?.roles[0] !== "FOREMAN") {
    return null
  }

  return (
    <>
      <button
        className="flex items-center justify-center bg-gray-900 font-bold text-base text-white px-4 md:px-8 h-12 my-auto rounded-xl"
        onClick={() => {
          setModal(true)
        }}
      >
        <span className="hidden md:inline">
          {`Добавити юна${user.sex !== "MALE" ? "ка" : "чку"}`}
        </span>
        <PlusCircle className="size-6 md:size-5 md:ml-2" color="#ffffff" />{" "}
      </button>
      <ModalWindow setModal={setModal} modal={modal} />
    </>
  )
}

export default ModalButton
