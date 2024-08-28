import { useEffect, useRef, useState } from "react";
import { Props } from "../../../types/accordion.ts";
import { CaretDown, CaretLeft } from "@phosphor-icons/react";

const AccordionItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [indaxesSum, setIndaxesSum] = useState(0);

  useEffect(() => {
    const count = item.checked.reduce((acc, num) => acc + num, 0);
    setIndaxesSum(count);
  }, [item.checked]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col border-b border-gray-200 w-[95%] mx-auto">
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-base font-medium md:font-semibold">
          {item.section} ({indaxesSum} / {item.items.length})
        </span>
        <button>
          {isOpen ? (
            <CaretDown className="size-4" />
          ) : (
            <CaretLeft className="size-4" />
          )}
        </button>
      </div>
      <div
        ref={descriptionRef}
        className={`overflow-auto transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ol className="list-decimal list-inside">
          {item.items.map((subItem, index) => (
            <li
              key={index}
              className={`text-base mb-2 font-normal ${
                item.checked[index] ? "text-[#A1A1AA] line-through" : ""
              }`}
            >
              {subItem}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AccordionItem;
