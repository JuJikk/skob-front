import { useState, useCallback, useEffect } from "react";
import AccordionMainItem from "@/components/accordion/accordion-main-item";
import { Step } from "@/types/accordion";
import { firstSample, secondSample, zeroSample } from "@/utils/const/probas";
import { useQuery } from "@tanstack/react-query";
import { useFindDataByEmail } from "@/lib/data"

interface AccordionProps {
  user?: any;
}

const Accordion: React.FC<AccordionProps> = ({ user }) => {
  const [currentProbaEmail, setCurrentProbaEmail] = useState<string>("");
  const [steps, setSteps] = useState<Step[]>([]);

  const userEmail = user?.emailAddresses[0].emailAddress;

  const { data, error, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(`/api/boys?email=${userEmail}`);
      return await response.json();
    },
  });

  const { data: userData, error: userError, isLoading } = useFindDataByEmail(
    currentProbaEmail || data?.data[0]?.email,
  );

  const loadUserData = useCallback(() => {
    console.log(userData?.data, "lskdjfonfken")
    if (userData) {
      setSteps([
        {
          title: "Нульова проба",
          data: zeroSample,
          checked: userData.data.zeroProba,
          probaType: "zeroProba",
        },
        {
          title: "Перша проба",
          data: firstSample,
          checked: userData.data.firstProba,
          probaType: "firstProba",
        },
        {
          title: "Друга проба",
          data: secondSample,
          checked: userData.data.secondProba,
          probaType: "secondProba",
        },
      ]);
    }
  }, [userData]);

  useEffect(() => {
    loadUserData()
    if (currentProbaEmail) {
      loadUserData();
    }
  }, [currentProbaEmail, loadUserData, data]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = event.target.value;
    setCurrentProbaEmail(selectedEmail);
  };

  if (isLoading || isFetching) return "Loading...";

  if (error || userError) return "An error has occurred.";

  return (
    <>
      {userData && (
        <div>
          <select
            value={currentProbaEmail}
            onChange={handleSelectChange}
            className="ml-4 p-2 rounded-md"
          >
            {data?.data.map(
              (
                user: { email: string; name: string },
                index: number
              ) => (
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
      )}
    </>
  );
};

export default Accordion;
