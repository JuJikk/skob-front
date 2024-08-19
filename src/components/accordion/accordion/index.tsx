"use client";
import { useEffect, useState } from "react";
import AccordionMainItem from "@/components/accordion/accordion-main-item";
import findDataByEmail from "@/frontServices/find-data-by-email";
import { Step, UserData } from "@/types/accordion";
import { firstSample, secondSample, zeroSample } from "@/utils/const/probas";
import axios from "axios";
import {useUser} from "@clerk/nextjs";

const AccordionComp: React.FC = () => {
  const [currentProbaEmail, setCurrentProbaEmail] =
    useState<string>("wefwe@mail.com");
  const [allUsers, setAllUsers] = useState<any>([]);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [steps, setSteps] = useState<Step[]>([]);

  const { user } = useUser();

  const getUsersEmails = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/getUsers?email=markomarynovych@gmail.com`,
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      return await findDataByEmail(currentProbaEmail);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(allUsers);

  useEffect(() => {
    getUsersEmails().then((data) => {
      setAllUsers((prevState: any) => {
        const newUsers = data.data.map(
          (user: { email: string; name: string }) => ({
            email: user.email,
            name: user.name,
          }),
        );
        const allUsers = [...prevState, ...newUsers];
        const uniqueUsers = Array.from(
          new Map(allUsers.map((user) => [user.email, user])).values(),
        );
        return uniqueUsers.sort((a, b) => a.email.localeCompare(b.email));
      });
    });
  }, []);

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
            {allUsers.map(
              (user: { email: string; name: string }, index: number) => (
                <option key={index} value={user.email}>
                  {user.name}
                </option>
              ),
            )}
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

export default AccordionComp;
