import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { addUser } from "../../../lib/data"

interface ModalWindowProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ setModal, modal }) => {
  const [inputValueMail, setInputValueMail] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueMail(event.target.value);
  };


  const handleSubmit = () => {
    if (inputValueMail) {
      addUser(inputValueMail).then(() => toggleModal())
    } else {
      console.error("User email address is undefined");
    }
  };
  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <Card className="min-w-[250px] w-1/2 p-8">
            <CardHeader className="flex gap-3">
              <p className="text-3xl font-bold">Добавте юнака</p>
            </CardHeader>
            <CardBody>
              <form action="" className="flex flex-col gap-4">
                <Input
                  size="md"
                  value={inputValueMail}
                  onChange={handleInputChangeMail}
                  type="email"
                  label="Пошта"
                  placeholder="Введіть електронну пошту"
                />
              </form>
            </CardBody>
            <CardFooter className="flex justify-between mt-1">
              <Button
                onClick={() => {
                  toggleModal();
                }}
                variant="bordered"
                className="bg-white text-gray-900 text-base font-bold border-gray-900 rounded-xl"
              >
                Повернутися назад
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                variant="solid"
                className="bg-gray-900 font-bold text-base text-white px-8 rounded-xl"
              >
                Додати юнака
              </Button>
            </CardFooter>
          </Card>
        </dialog>
      )}
    </>
  );
};

export default ModalWindow;
