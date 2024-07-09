import React, { useState } from "react";
import AccordionItem from "@/components/Accordion/AccordionItem";

interface Step {
  title: string;
  data: { section: string; items: string[] }[];
}

const AccordionMainItem = ({ step }: { step: Step }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col border-b border-gray-200 w-full lg:w-1/4 mx-auto">
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
          {step.data.map(
            (
              obj: { section: string; items: string[] },
              index: React.Key | null | undefined,
            ) => (
              <AccordionItem item={obj} key={index} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionMainItem;
