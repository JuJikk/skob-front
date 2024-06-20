'use client'
import AccordionItem from "@/components/AccordionItem";
import { firstSample, secondSample, zeroSample } from "@/components/proba_json";
import { useState } from "react";

const AccordionComp = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps = [zeroSample, firstSample, secondSample];

  const handleSelectChange = (event: { target: { value: any } }) => {
    setCurrentStep(Number(event.target.value));
  };

  return (
      <div>
        <select value={currentStep} onChange={handleSelectChange}>
          <option value={0}>Нульова проба</option>
          <option value={1}>Перша проба</option>
          <option value={2}>Друга проба</option>
        </select>
        {steps[currentStep].map((obj, index) => {
          return <AccordionItem item={obj} key={index} />;
        })}
      </div>
  );
};

export default AccordionComp;
