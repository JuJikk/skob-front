import React, { useState, useEffect, useCallback } from "react";
import { Step, UserData } from "../../../types/accordion";
import { firstSample, secondSample, zeroSample } from "../../../utils/const/probas";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import AccordionMainItem from "../accordion-main-item"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface AccordionProps {
  user?: UserData;
}

const AccordionUserComponent: React.FC<AccordionProps> = () => {
  const [steps, setSteps] = useState<Step[]>([]);

  const { data: currentUserData, isLoading: isUserLoading, error: userDataError, refetch } = useQuery({
    queryKey: ["currentUserData"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/users/me`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const refetchData = () => refetch();

  const loadUserData = useCallback(() => {
    if (currentUserData) {
      setSteps([
        {
          title: "Нульова проба",
          data: zeroSample,
          checked: currentUserData.zeroProba,
          probaType: "zeroProba",
        },
        {
          title: "Перша проба",
          data: firstSample,
          checked: currentUserData.firstProba,
          probaType: "firstProba",
        },
        {
          title: "Друга проба",
          data: secondSample,
          checked: currentUserData.secondProba,
          probaType: "secondProba",
        },
      ]);
    }
  }, [currentUserData]);

  useEffect(() => {
    loadUserData();
  }, [currentUserData]);

  if (isUserLoading || isUserLoading) return "Завантажуємо проби...";
  if (userDataError || userDataError) return "An error has occurred.";

  return (
    <>
        <div className="max-w-[70rem] mx-auto px-8">
          <Accordion>
            {steps.map((step, index) => (
              <AccordionItem className="text-2xl font-bold" key={index} title={step.title}>
                <AccordionMainItem
                  refetchData={refetchData}
                  step={step}
                  currentProbaEmail={currentUserData.email}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </>
  );
};

export default AccordionUserComponent;
