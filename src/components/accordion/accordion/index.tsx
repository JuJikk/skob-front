"use client";

import { useEffect, useState, useCallback } from "react";
import AccordionMainItem from "@/components/accordion/accordion-main-item";
import { Step, UserData } from "@/types/accordion";
import { firstSample, secondSample, zeroSample } from "@/utils/const/probas";
import { findDataByEmail } from "@/lib/data";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Accordion: React.FC = () => {
  const [allUsers, setAllUsers] = useState<{ email: string; name: string }[]>([]);
  const [currentProbaEmail, setCurrentProbaEmail] = useState<string>("");
  const [userData, setUserData] = useState<UserData | undefined>();
  const [steps, setSteps] = useState<Step[]>([]);

  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  const getUsersEmails = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/boys?email=${userEmail}`);
      return data.data.map((user: { email: string; name: string }) => ({
        email: user.email,
        name: user.name,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }, [userEmail]);

  const loadUserData = useCallback(async (email: string) => {
    try {
      const { data } = await findDataByEmail(email);
      setUserData(data);
      setSteps([
        {
          title: "Нульова проба",
          data: zeroSample,
          checked: data.zeroProba,
          probaType: "zeroProba",
        },
        {
          title: "Перша проба",
          data: firstSample,
          checked: data.firstProba,
          probaType: "firstProba",
        },
        {
          title: "Друга проба",
          data: secondSample,
          checked: data.secondProba,
          probaType: "secondProba",
        },
      ]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (userEmail) {
        const users = await getUsersEmails();
        setAllUsers(users);
        if (users.length > 0) {
          const email = users[0].email;
          setCurrentProbaEmail(email);
          loadUserData(email);
        }
      }
    };
    fetchInitialData();
  }, [userEmail, getUsersEmails, loadUserData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = event.target.value;
    setCurrentProbaEmail(selectedEmail);
    loadUserData(selectedEmail);
  }

  return (
      <>
        {userData && (
            <div>
              <select
                  value={currentProbaEmail}
                  onChange={handleSelectChange}
                  className="ml-4 p-2 rounded-md"
              >
                {allUsers.map((user, index) => (
                    <option key={index} value={user.email}>
                      {user.name}
                    </option>
                ))}
              </select>
              <ol className="pl-8">
                <h2 className="mt-4 ml-4 font-bold text-2xl">{userData.name}</h2>
                {steps.map((step, index) => (
                    <div className="flex" key={index}>
                      <li className="w-full">
                        <AccordionMainItem step={step} currentProbaEmail={currentProbaEmail} />
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
