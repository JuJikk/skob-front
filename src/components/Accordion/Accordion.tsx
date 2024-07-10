"use client";
import { firstSample, secondSample, zeroSample } from "@/components/proba_json";
import React, { useEffect, useState } from "react";
import AccordionMainItem from "@/components/Accordion/AccordionMainItem";
import findDataByEmail from "@/frontServices/findDataByEmail";
import { Step } from "@/types/accordion";
import { UserData } from "@/types/accordion";

const AccordionComp: React.FC = () => {
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
          },
          {
            title: "Перша проба",
            data: firstSample,
            checked: data.data.firstProba,
          },
          {
            title: "Друга проба",
            data: secondSample,
            checked: data.data.secondProba,
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
                  <AccordionMainItem step={step} />
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

export default AccordionComp;
