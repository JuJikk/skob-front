import React, { useReducer, useState } from "react";
import AccordionItem from "@/components/Accordion/AccordionItem";
import { ProbaData } from "@/types/accordion";

interface Step {
  title: string;
  data: { section: string; items: string[] }[];
  checked: ProbaData;
}

const mergeDataWithChecked = (data: any[], checked: ProbaData) => {
  return data.map((sectionObj, index) => {
    const sectionKey = String.fromCharCode(97 + index);
    return {
      section: sectionObj.section,
      items: sectionObj.items,
      checked: checked[sectionKey],
    };
  });
};

const AccordionMainItem = ({ step }: { step: Step }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [combinedData] = useReducer(mergeDataWithChecked, [], () =>
    mergeDataWithChecked(step.data, step.checked),
  );

  return (
    <div className="flex flex-col border-b border-gray-200 w-full mx-auto">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span>{step.title}</span>
        <button>{isOpen ? "-" : "+"}</button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pl-8">
          {combinedData.map((obj, index) => (
            <AccordionItem
              item={obj}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionMainItem;
