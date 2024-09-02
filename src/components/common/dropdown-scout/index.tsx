import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react"
import { useUserStore } from "../../../lib/auth/useUser.ts"
import { signOut } from "../../../lib/auth/userActions.ts"
import { SignOut } from "@phosphor-icons/react"
import ModalEditScout from "../../modal/edit-scout-modal"
import ModalWindow from "../../modal/modal-add-scout"

const DropDownScout = () => {
  const { isOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenAddScout, onOpenChange: onOpenChangeAddScout } =
    useDisclosure()
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  if (!user) return null

  return (
    <div className="my-auto">
      <ModalWindow
        isOpen={isOpenAddScout}
        onOpenChange={onOpenChangeAddScout}
      />
      <ModalEditScout isOpen={isOpen} onOpenChange={onOpenChange} />
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
