import ModalWindow from "../modal-window"
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { PlusCircle } from "@phosphor-icons/react"
import { useDisclosure } from "@nextui-org/react"

const ModalButton = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
        onClick={onOpen}
      >
        <span className="hidden md:inline">
          {`Добавити юна${user.sex !== "MALE" ? "ка" : "чку"}`}
        </span>
        <PlusCircle className="size-6 md:size-5 md:ml-2" color="#ffffff" />{" "}
      </button>
      <ModalWindow onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  )
}

export default ModalButton
