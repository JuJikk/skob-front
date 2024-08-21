import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
// import { useUser } from "@clerk/nextjs";
// import {createForm} from "@/lib/data";

interface ModalWindowProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ setModal, modal })=> {
  const [inputValue, setInputValue] = useState("");
  const [inputValueMail, setInputValueMail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  // const { user } = useUser();

  // useEffect(() => {
  //   if (user?.emailAddresses && user.emailAddresses[0] && user.emailAddresses[0].emailAddress) {
  //     setCurrentUserEmail(user.emailAddresses[0].emailAddress);
  //   } else {
  //     console.error("User email address is undefined");
  //   }
  // },[user?.emailAddresses])

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueMail(event.target.value);
  };

  // const handleSubmit = () => {
  //   if (currentUserEmail && inputValueMail && inputValue) {
  //     createForm(inputValue, inputValueMail, currentUserEmail);
  //     toggleModal();
  //     setInputValue("");
  //     setInputValueMail("");
  //   } else {
  //     console.error("User email address is undefined");
  //   }
  // };
  return (
    <>
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
                onClick={() => {
                  toggleModal();
                }}
              >
                Відміна
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 w-24"
                // onClick={() => {
                //   handleSubmit();
                /*}}*/
              >
                Прийняти
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalWindow;
