"use client";
import { useEffect, useState } from "react";
import findDataByEmail from "@/frontServices/findDataByEmail";
import AccordionComp from "@/components/Accordion/Accordion";

export default function AddNewProba() {
  const [userData, setUserData] = useState();

  const fetchData = async () => {
    try {
      return await findDataByEmail("john.doe@example.com");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((data) => setUserData(data.data));
  }, []);

  return (
    <>
      <AccordionComp />
    </>
  );
}
