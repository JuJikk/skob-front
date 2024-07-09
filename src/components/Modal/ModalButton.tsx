'use client'
import ModalWindow from "@/components/Modal/modalWindow";
import { useState } from "react";

const ModalButton = () => {
  const [modal, setModal] = useState(false);

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
