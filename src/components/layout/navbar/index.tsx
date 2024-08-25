import ModalButton from "../../modal/modal-button"
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { signOut } from "../../../lib/auth/userActions.ts"

export const NavBar = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  const navigate = useNavigate()
  return (
    <div className="flex m-2 justify-between">
      <img className="h-12" src="../../../../public/logo.svg" alt="logo" />
      {user && <ModalButton />}
      <div>
        {!user ? (
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                navigate("/login")
              }}
              variant="bordered"
              className="bg-white text-gray-900 text-base font-bold border-gray-900 rounded-xl"
            >
              Увійти
            </Button>
            <Button
              onClick={() => {
                navigate("/signup")
              }}
              variant="solid"
              className="bg-gray-900 font-bold text-base text-white px-8 rounded-xl"
            >
              Зареєструватись
            </Button>
          </div>
        ) : (
          <Button
            variant="bordered"
            className="bg-white text-gray-900 text-base font-bold border-gray-900 rounded-xl"
            onClick={() => {
              signOut()
              location.reload()
            }}
          >
            Вийти
          </Button>
        )}
      </div>
    </div>
  )
}
