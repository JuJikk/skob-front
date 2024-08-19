'use client'
import { useState } from "react";
import ModalWindow from "@/components/modal/modal-window";
import {useUser} from "@clerk/nextjs";

const ModalButton = () => {
  const [modal, setModal] = useState(false)
  const { user } = useUser()
    if (user?.publicMetadata.role !== "ADMIN"){
        return null;
    }

  return (
    <>
      <div
        className="hover:cursor-pointer hover:text-red-600"
        onClick={() => {
          setModal(true);
        }}
      >
          Добавити юнака/чку
      </div>
      <ModalWindow setModal={setModal} modal={modal} />
    </>
  );
};

export default ModalButton;
