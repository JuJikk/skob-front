"use client";
import {ChangeEvent, useState} from "react";

export default function AddNewProba() {
    const [modal, setModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputValueMail, setInputValueMail] = useState("");

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValueMail(event.target.value);
    };

    const handleSubmit = () => {
        toggleModal();
        console.log(inputValue);
        setModal(!modal);
        setInputValue("")
        setInputValueMail("")
    };

  return (
    <>
      <div
        className="rounded-full h-16 w-16 bg-amber-100 flex justify-center items-center text-3xl hover:cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        +
      </div>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8 rounded-2xl">
            <div className="flex flex-col items-center">
              <p>Добавити нову пробу</p>
              <form action="" className="flex flex-col gap-4 my-4">
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Введіть ім'я та прізвище"
                />
                <input
                  value={inputValueMail}
                  onChange={handleInputChangeMail}
                  type="email"
                  placeholder="Введіть пошту юнака/чки"
                />
              </form>
            </div>
            <div className="flex justify-around">
              <button
                type="button"
                className="bg-gray-400 text-white p-2 w-24"
                onClick={toggleModal}
              >
                Відміна
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 w-24"
                onClick={handleSubmit}
              >
                Прийняти
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
