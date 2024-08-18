import { ProbaData } from "@/types/accordion";
import { useEffect, useState } from "react";
import AccordionItem from "@/components/accordion/accordion-item"

interface Step {
  title: string;
  data: { section: string; items: string[] }[];
  checked: ProbaData;
  probaType: string;
}

const mergeDataWithChecked = (
  data: any[],
  checked: ProbaData,
  probaType: string,
) => {
  return data.map((sectionObj, index) => {
    const sectionKey = String.fromCharCode(97 + index);
    return {
      section: sectionObj.section,
      items: sectionObj.items,
      checked: checked[sectionKey],
      probaType,
    };
  });
};

const AccordionMainItem = ({
  step,
  currentProbaEmail,
}: {
  step: Step;
  currentProbaEmail: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [combinedData, setCombinedData] = useState(() =>
    mergeDataWithChecked(step.data, step.checked, step.probaType),
  );

  useEffect(() => {
    setCombinedData(
      mergeDataWithChecked(step.data, step.checked, step.probaType),
    );
  }, [step.data, step.checked, step.probaType]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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
              currentProbaEmail={currentProbaEmail}
              currentStep={Object.keys(step.checked)[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionMainItem;
