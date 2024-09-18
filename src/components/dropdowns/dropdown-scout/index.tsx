import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger, useDisclosure,
} from "@nextui-org/react"
import { useUserStore } from "../../../lib/auth/useUser.ts"
import { signOut } from "../../../lib/auth/userActions.ts"
import { SignOut } from "@phosphor-icons/react"
import { ChartBar } from "@medusajs/icons"
import ShowStatisticsModal from "../../modal/statistics-modal"

const DropDownScout = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!user) return null

  return (
    <div className="my-auto">
      <ShowStatisticsModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.picture ?? ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Welcome"
          >
            <p className="font-semibold">Вітаємо</p>
            <p className="font-semibold">{user.name}</p>
          </DropdownItem>

          <DropdownItem
            startContent={<ChartBar className="size-6" />}
            textValue="Show statistics"
            key="show"
            onClick={onOpen}
          >
            Показати мою статистику
          </DropdownItem>

          <DropdownItem
            onClick={signOut}
            textValue="Logout"
            key="logout"
            startContent={<SignOut className="size-6" color="#000000" />}
            color="danger"
            className="flex flex-row flex-nowrap mt-2"
          >
            Вийти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DropDownScout
