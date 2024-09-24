import { useUserStore } from "../../../lib/auth/useUser.ts"
import LogoSvg from "../../common/logo.tsx"
import UserSelect from "../../common/select"
import DropDown from "../../dropdowns/dropdown"
import DropDownScout from "../../dropdowns/dropdown-scout"
import { useHasProbaStore } from "../../../lib/contex/isForemanHasProba.ts"

export const NavBar = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  const { ishasProba } = useHasProbaStore()

  return (
    <div className="flex mb-3 mt-4 mx-auto px-4 gap-2 max-w-[1104px] justify-between">
      <LogoSvg className={"h-5 md:h-9 lg:h-12 w-fit my-auto"} />
      {(user?.roles[0] === "FOREMAN" && ishasProba) && (
        <div className="flex gap-2 justify-around w-full">
          <UserSelect />
        </div>
      )}
      {user?.roles[0] === "FOREMAN" ? (
        <DropDown isHasProba={ishasProba} />
      ) : (
        <DropDownScout />
      )}
    </div>
  )
}
