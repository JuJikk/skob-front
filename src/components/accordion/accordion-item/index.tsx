import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ModalCheckoutButton from "../../modal/modal-checkout-button"
import { Props } from "../../../types/accordion.ts"

const AccordionItem = ({ item, currentProbaEmail, currentStep }: Props) => {
  const [openLoader, setOpenLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [indaxesSum, setIndaxesSum] = useState(0);
  const [modal, setModal] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [pendingChecked, setPendingChecked] = useState<boolean | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const count = () => item.checked.reduce((acc, num) => acc + num, 0);
    setIndaxesSum(count);
  }, [item.checked]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const mutation = useMutation({
    mutationFn: ({ probaName, probaSubName, probaIndex, value }: any) => {
      return axios.patch(`${BACKEND_URL}/probas/${currentProbaEmail}`, {
        probaName,
        probaSubName,
        probaIndex,
        value,
      }, {withCredentials: true});
    },
    onSuccess: (_data, variables) => {
      item.checked[variables.index] = variables.value;
      const newSum = item.checked.reduce((acc, num) => acc + num, 0);
      setIndaxesSum(newSum);
    },
    onError: (error) => {
      console.error("Error updating checked status:", error);
    },
  });
  //
  // console.log(item.probaType)

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPendingIndex(index);
      setPendingChecked(e.target.checked);
      setModal(true);
    };

  const handleModalConfirm = () => {
    if (pendingIndex !== null && pendingChecked !== null) {
      setOpenLoader(true);
      mutation.mutate(
        {
          probaName: item.probaType,
          probaSubName: currentStep,
          probaIndex: pendingIndex,
          value: pendingChecked ? 1 : 0,
        },
        {
          onSettled: () => {
            setPendingIndex(null);
            setPendingChecked(null);
            setModal(false);
            setOpenLoader(false);
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col border-b border-gray-200 w-full lg:w-1/4 mx-auto">
      <ModalCheckoutButton
        modal={modal}
        onLoading={openLoader}
        setModal={setModal}
        onConfirm={handleModalConfirm}
        onCancel={() => setModal(false)}
      />
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span>
          {item.section} ({indaxesSum} / {item.items.length})
        </span>
        <button>{isOpen ? "-" : "+"}</button>
      </div>
      <div
        ref={descriptionRef}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          maxHeight: isOpen
            ? `${descriptionRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <ol className="list-decimal pl-8">
          {item.items.map((subItem, index) => (
            <div key={index} className="flex">
              <input
                onChange={handleCheckboxChange(index)}
                checked={!!item.checked[index]}
                className="mb-auto mr-8 mt-1"
                type="checkbox"
              />
              <li className={item.checked[index] ? "line-through" : ""}>
                {subItem}
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AccordionItem;
