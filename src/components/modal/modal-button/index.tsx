import { useState } from "react";
import ModalWindow from "../modal-window";
import { useUserStore } from "../../../lib/auth/useUser.tsx"
import { Button } from "@nextui-org/react"

const ModalButton = () => {
  const [modal, setModal] = useState(false);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))
  if (user?.roles[0] !== "FOREMAN") {
    return null;
  }

  return (
    <>
      <Button
        variant="solid"
        className="bg-gray-900 font-bold text-base text-white px-8 rounded-xl"
        onClick={() => {
          setModal(true);
        }}
      >
        {`Добавити юна${user.sex === "MALE" ? "ка" : "чку"}`}
      </Button>
      <ModalWindow setModal={setModal} modal={modal} />
    </>
  );
};

export default ModalButton;
