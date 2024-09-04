import { useUserStore } from "../../../lib/auth/useUser.ts"
import UserSelect from "../../common/select"
import DropDown from "../../dropdowns/dropdown"
import DropDownScout from "../../dropdowns/dropdown-scout"

export const NavBar = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
  const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL

  return (
    <div className="flex mb-3 mt-4 mx-auto px-4 gap-2 max-w-[1104px] justify-between">
      <img
        className="h-5 md:h-9 lg:h-12 my-auto"
        src={`${VITE_PUBLIC_URL}logo.svg`}
        alt="logo"
      />
      {user?.roles[0] === "FOREMAN" && (
        <div className="flex gap-2 justify-around w-full">
          <UserSelect />
        </div>
      )}
      {user?.roles[0] === "FOREMAN" ? <DropDown/> : <DropDownScout/>}
    </div>
  )
}
