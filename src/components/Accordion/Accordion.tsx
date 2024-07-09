"use client";
import { firstSample, secondSample, zeroSample } from "@/components/proba_json";
import React from "react";
import AccordionMainItem from "@/components/Accordion/AccordionMainItem";

const AccordionComp = () => {
  const steps = [
    { title: "Нульова проба", data: zeroSample },
    { title: "Перша проба", data: firstSample },
    { title: "Друга проба", data: secondSample },
  ];

  return (
    <div>
      <select className="ml-4 p-2 rounded-md">
        <option value={0}>Юнак 1</option>
        <option value={1}>Юнак 2</option>
        <option value={2}>Юнак 3</option>
      </select>
      <ol className="pl-8">
        {steps.map((step, index) => (
          <div className="flex" key={index}>
            <li className="w-full">
              <AccordionMainItem step={step} />
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default AccordionComp;
