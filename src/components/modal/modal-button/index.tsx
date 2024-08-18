'use client'
import { useState } from "react";
import ModalWindow from "@/components/modal/modal-window";

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
