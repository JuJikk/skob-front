import { useState, useEffect, useCallback } from "react";
import { Step, UserData } from "../../../types/accordion";
import { useFindDataByEmail, useFindUserDataByEmail } from "../../../lib/data"
import { firstSample, secondSample, zeroSample } from "../../../utils/const/probas";
import AccordionMainItem from "../accordion-main-item";

interface AccordionProps {
  user?: UserData;
}

const Accordion: React.FC<AccordionProps> = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  const { data: userData, error: userError, isLoading } = useFindDataByEmail();
  const currentUserEmailToFetch = currentUserEmail || userData?.[0]?.email;

  const { data: currentUserData, isLoading: isUserLoading, error: userDataError } = useFindUserDataByEmail(
    currentUserEmailToFetch || ''
  );

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = event.target.value;
    setCurrentUserEmail(selectedEmail);
  };

  useEffect(() => {
    if (currentUserEmail) {
      loadUserData();
    }
  }, [currentUserEmail, loadUserData]);

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
            {userData.map((user, index) => (
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
