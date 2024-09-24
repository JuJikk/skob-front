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
import {
  PencilSimpleLine,
  PenNib,
  PlusCircle,
  SignOut,
} from "@phosphor-icons/react"
import { useModalStore } from "../../../lib/contex/SignAllProbaModal.ts"
import ModalEditScout from "../../modal/edit-scout-modal"
import ModalWindow from "../../modal/modal-add-scout"
import { useEffect, useState } from "react"

const DropDown = ({ isHasProba: isHasProba }: { isHasProba: boolean }) => {
  const { openModal } = useModalStore()
  const [disabledItems, setDisabledItems] = useState<string[]>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenAddScout,
    onOpen: onOpenAddScout,
    onOpenChange: onOpenChangeAddScout,
  } = useDisclosure()
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  useEffect(() => {
    if (!isHasProba) {
      setDisabledItems(["edit", "sign"])
    } else {
      setDisabledItems([])
    }
  }, [isHasProba])

  if (!user) return null

  return (
    <div className="my-auto" id="dropdown">
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
        <DropdownMenu disabledKeys={disabledItems} aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Welcome"
          >
            <p className="font-semibold">Вітаємо</p>
            <p className="font-semibold">{user.name}</p>
          </DropdownItem>

          <DropdownItem
            startContent={<PlusCircle className="size-6" />}
            textValue="Add scout"
            key="add"
            onClick={onOpenAddScout}
          >
            Додати юнака/юначку
          </DropdownItem>

          <DropdownItem
            startContent={<PenNib className="size-6" color="#000" />}
            textValue="Sign proba"
            key="sign"
            onClick={openModal}
          >
            Підписати цілу пробу
          </DropdownItem>

          <DropdownItem
            key="edit"
            startContent={<PencilSimpleLine className="size-6" />}
            textValue="Edit scout"
            onClick={onOpen}
          >
            Редагувати інформацію про юнаків
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

export default DropDown
