"use client";
import ModalCheckoutButton from "@/components/modal/modal-checkout-button";
import { useEffect, useRef, useState } from "react";
import { updateCheckedStatus } from "@/lib/data";

type Props = {
  item: {
    section: string;
    items: string[];
    checked: number[];
    probaType: string;
  };
  currentProbaEmail: string;
  currentStep: string;
};

const AccordionItem = ({ item, currentProbaEmail, currentStep }: Props) => {
  const [openLoader, setOpenLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [indaxesSum, setIndaxesSum] = useState(0);
  const [modal, setModal] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [pendingChecked, setPendingChecked] = useState<boolean | null>(null);

  useEffect(() => {
    const count = () => item.checked.reduce((acc, num) => acc + num, 0);
    setIndaxesSum(count);
  }, [item.checked]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const updateCheckboxStatus = async (index: number, checked: boolean) => {
    try {
      const updatedChecked = [...item.checked];
      updatedChecked[index] = checked ? 1 : 0;

      await updateCheckedStatus(
        currentProbaEmail,
        item.probaType,
        currentStep,
        index,
        updatedChecked[index],
      );

      item.checked[index] = updatedChecked[index];
      const newSum = updatedChecked.reduce((acc, num) => acc + num, 0);
      setIndaxesSum(newSum);
    } catch (error) {
      console.error("Error updating checked status:", error);
    }
  };

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPendingIndex(index);
      setPendingChecked(e.target.checked);
      setModal(true);
    };

  const handleModalConfirm = () => {
    if (pendingIndex !== null && pendingChecked !== null) {
      setOpenLoader(true);
      updateCheckboxStatus(pendingIndex, pendingChecked).then(() => {
        setPendingIndex(null);
        setPendingChecked(null);
        setModal(false);
        setOpenLoader(false);
      });
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
