import { useUserStore } from "../../../lib/auth/useUser.tsx"
import UserSelect from "../../common/select"
import DropDown from "../../common/dropdown"

export const NavBar = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  return (
    <div className="flex md:mb-8 mt-4 mx-auto px-4 gap-2 max-w-[1104px] justify-between">
      <img
        className="h-5 md:h-9 lg:h-12 my-auto"
        src="../../../../public/logo.svg"
        alt="logo"
      />
      {user?.roles[0] === "FOREMAN" && (
        <div className="flex gap-2 justify-around w-full">
          <UserSelect />
        </div>
      )}
      <DropDown/>
    </div>
  )
}
