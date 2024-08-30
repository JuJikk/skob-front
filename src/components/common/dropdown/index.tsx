import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useUserStore } from "../../../lib/auth/useUser.tsx";
import { signOut } from "../../../lib/auth/userActions.ts";
import { PencilSimpleLine, PlusCircle, SignOut } from "@phosphor-icons/react";
import { useModalStore } from "../../../lib/contex/SignAllProbaModal.tsx"
import ModalEditScout from "../../modal/edit-scout-modal"

const DropDown = () => {
  const { openModal } = useModalStore();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  if (!user) return null;

  return (
    <div className="my-auto">
      <ModalEditScout
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      />
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.picture}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Вітаємо</p>
            <p className="font-semibold">{user.name}</p>
          </DropdownItem>

          <DropdownItem
            startContent={<PlusCircle className="size-6" color="#000" />}
            key="sign"
            onClick={openModal}
          >
            Підписати цілу пробу
          </DropdownItem>

          <DropdownItem
            key="edit"
            startContent={<PencilSimpleLine className="size-6" />}
            onClick={onOpen}
          >
            Редагувати інформацію про юнаків
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              signOut();
              location.reload();
            }}
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
  );
};

export default DropDown;
