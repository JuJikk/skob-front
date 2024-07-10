"use client";
import React, {useState, useRef, useEffect} from "react";

type Props = {
  item: {
    section: string;
    items: string[];
    checked: number[];
  };
};

const AccordionItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usedIndex, setUsedIndex] = useState<number[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [indaxesSum, setIndaxesSum] = useState(0);
  console.log(item, "itemm");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

    useEffect(() => {
        const count = () => item.checked.reduce((acc, num) => acc + num, 0);
        setIndaxesSum(count);
    }, [item.checked]);

  const handleCheckboxChange =    // badddd
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setUsedIndex([...usedIndex, index]);
      } else {
        setUsedIndex(usedIndex.filter((v) => v !== index));
      }
    };

  return (
    <div className="flex flex-col border-b border-gray-200 w-full lg:w-1/4 mx-auto">
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
                checked={!!item.checked[index]} // badddd
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
