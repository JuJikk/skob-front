"use client";

import { useEffect, useState } from "react";
import AccordionMainItem from "@/components/accordion/accordion-main-item";
import { Step, UserData } from "@/types/accordion";
import { firstSample, secondSample, zeroSample } from "@/utils/const/probas";
import {findDataByEmail} from "@/lib/data";

const Accordion: React.FC = () => {
  const [currentProbaEmail, setCurrentProbaEmail] =
    useState<string>("wefwe@mail.com");
  const [userData, setUserData] = useState<UserData | undefined>();
  const [steps, setSteps] = useState<Step[]>([]);

  const fetchData = async () => {
    try {
      return await findDataByEmail(currentProbaEmail);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        setUserData(data.data);
        setSteps([
          {
            title: "Нульова проба",
            data: zeroSample,
            checked: data.data.zeroProba,
            probaType: "zeroProba",
          },
          {
            title: "Перша проба",
            data: firstSample,
            checked: data.data.firstProba,
            probaType: "firstProba",
          },
          {
            title: "Друга проба",
            data: secondSample,
            checked: data.data.secondProba,
            probaType: "secondProba",
          },
        ]);
      }
    });
  }, [currentProbaEmail]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentProbaEmail(event.target.value);
  };

  return (
    <>
      {userData ? (
        <div>
          <select
            value={currentProbaEmail}
            onChange={handleSelectChange}
            className="ml-4 p-2 rounded-md"
          >
            <option value={"wefwe@mail.com"}>Юнак 1</option>
            <option value={"wefwe@mail.com"}>Юнак 2</option>
            <option value={"wefwe@mail.com"}>Юнак 3</option>
          </select>
          <ol className="pl-8">
            <h2 className="mt-4 ml-4 font-bold text-2xl">{userData.name}</h2>
            {steps.map((step, index) => (
              <div className="flex" key={index}>
                <li className="w-full">
                  <AccordionMainItem
                    step={step}
                    currentProbaEmail={currentProbaEmail}
                  />
                </li>
              </div>
            ))}
          </ol>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Accordion;
