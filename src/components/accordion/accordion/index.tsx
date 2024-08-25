import React, { useState, useEffect, useCallback } from "react";
import { Step, UserData } from "../../../types/accordion";
import { useFindDataByEmail } from "../../../lib/data";
import { firstSample, secondSample, zeroSample } from "../../../utils/const/probas";
import AccordionMainItem from "../accordion-main-item";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface AccordionProps {
  user?: UserData;
}

const Accordion: React.FC<AccordionProps> = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);

  const { data: userData, error: userError, isLoading } = useFindDataByEmail();

  useEffect(() => {
    if (userData && userData.length > 0 && !currentUserEmail) {
      setCurrentUserEmail(userData[0].email);
    }
  }, [userData, currentUserEmail]);

  const currentUserEmailToFetch = currentUserEmail || userData?.[0]?.email || "";

  const { data: currentUserData, isLoading: isUserLoading, error: userDataError, refetch } = useQuery({
    queryKey: ["currentUserData", currentUserEmailToFetch],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/users/${currentUserEmailToFetch}`, {
        withCredentials: true,
      });
      return response.data;
    },
    enabled: !!currentUserEmailToFetch,
  });

  const refetchData = () => refetch()

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
  }, [currentUserData, currentUserEmailToFetch]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserEmail(event.target.value);
  };

  if (isLoading || isUserLoading) return "Завантажуємо проби...";
  if (userError || userDataError) return "An error has occurred.";

  return (
    <>
      {userData?.length > 0 && (
        <div>
          <select
            value={currentUserEmailToFetch}
            onChange={handleSelectChange}
            className="ml-4 p-2 rounded-md"
          >
            {userData.map((user: UserData, index: number) => (
              <option key={index} value={user.email}>
                {user.name}
              </option>
            ))}
          </select>
          <ol className="pl-8">
            <h2 className="mt-4 ml-4 font-bold text-2xl">{currentUserData?.name}</h2>
            {steps.map((step, index) => (
              <div className="flex" key={index}>
                <li className="w-full">
                  <AccordionMainItem
                    refetchData={refetchData}
                    step={step}
                    currentProbaEmail={currentUserEmailToFetch}
                  />
                </li>
              </div>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default Accordion;
