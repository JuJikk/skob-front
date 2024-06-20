"use client";
import React, { useState, useRef } from "react";

type Props = {
  item: {
    section: string;
    items: string[];
  };
};

const AccordionItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usedIndex, setUsedIndex] = useState<number[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

    const handleCheckboxChange =
        (index: number) => () => {
            if (usedIndex.includes(index)) {
                setUsedIndex(usedIndex.filter((v) => v !== index));
            } else {
                setUsedIndex([...usedIndex, index]);
            }
        };

  return (
    <div className="flex flex-col border-b border-gray-200 w-1/4 mx-auto">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span>{item.section}</span>
        <button>{isOpen ? "-" : "+"}</button>
      </div>
      <div
        ref={descriptionRef}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
        style={{
          maxHeight: isOpen
            ? `${descriptionRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <ol className="list-decimal pl-8">
          {item.items.map((subItem, index) => (
            <div key={index} className="flex" onClick={handleCheckboxChange(index)}>
              <input
                checked={usedIndex.includes(index)}
                className="mb-auto mr-6 mt-1"
                type="checkbox"
              />
              <li className={usedIndex.includes(index) ? "line-through" : ""}>
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
