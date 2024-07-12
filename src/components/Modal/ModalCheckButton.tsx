import React, { Dispatch, SetStateAction } from "react";

interface ModalWindowProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalCheckWindow: React.FC<ModalWindowProps> = ({ setModal, modal, onConfirm, onCancel }) => {
  return (
      <>
        {modal && (
            <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
              <div className="bg-white m-auto p-8 rounded-2xl h-[200px] w-[250px] flex flex-col justify-center items-center">
                <span className="mx-auto font-bold">Підписати точку</span>
                <div className="flex justify-around items-center flex-col h-full">
                  <button className="bg-gray-400 text-white p-2 w-36 rounded" onClick={onCancel}>Я передумав/ла</button>
                  <button className="bg-red-500 text-white p-2 w-36 rounded" onClick={onConfirm}>Так!</button>
                </div>
              </div>
            </dialog>
        )}
      </>
  );
};

export default ModalCheckWindow;
