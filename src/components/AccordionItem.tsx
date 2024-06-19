"use client";
import { useState, useRef } from "react";

type Props = {
    title: string;
    description: string;
};

const AccordionItem = ({ title, description }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col border-b border-gray-200 w-1/2">
            <div className="flex justify-between items-center p-4 cursor-pointer" onClick={toggleAccordion}>
                <span>{title}</span>
                <button>{isOpen ? "-" : "+"}</button>
            </div>
            <div
                ref={descriptionRef}
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
                style={{ maxHeight: isOpen ? `${descriptionRef.current?.scrollHeight}px` : "0px" }}
            >
                <div className="p-4">{description}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
