import ModalButton from "../../modal/modal-button"
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { signOut } from "../../../lib/auth/userActions.ts"
import UserSelect from "../../common/select"
import { SignOut } from "@phosphor-icons/react"

export const NavBar = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  const navigate = useNavigate()
  return (
    <div className="flex md:mb-8 mt-4 mx-auto px-4 gap-2 max-w-[1104px] justify-between">
      <img
        className="h-5 md:h-9 lg:h-12 my-auto"
        src="../../../../public/logo.svg"
        alt="logo"
      />
      {user?.roles[0] === "FOREMAN" && (
        <div className="flex gap-2 justify-around w-full">
          <UserSelect /> <ModalButton />
        </div>
      )}
      <div>
        {!user ? (
          <div className="flex flex-col items-center justify-center h-12 gap-2">
            <Button
              onClick={() => {
                navigate("/login")
              }}
              variant="bordered"
              className="bg-white h-12 text-gray-900 text-base font-bold border-gray-900 rounded-xl"
            >
              Увійти
            </Button>
            <Button
              onClick={() => {
                navigate("/signup")
              }}
              variant="solid"
              className="bg-gray-900 h-12 font-bold text-base text-white px-8 rounded-xl"
            >
              Зареєструватись
            </Button>
          </div>
        ) : (
          <button
            className="flex items-center justify-center gap-2 bg-white border-2 border-black p-3 my-2 text-gray-900 text-base font-bold rounded-xl"
            onClick={() => {
              signOut()
              location.reload()
            }}
          >
            <SignOut size={20} color="#000000" weight="bold" />
            <span className="hidden md:inline">Вийти</span>
          </button>
        )}
      </div>
    </div>
  )
}
