'use client'

import Accordion from "@/components/accordion/accordion";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="w-full justify-center align-middle mt-8">
        <h1 className="text-center">Скоб! Це твоя онлайн проба</h1>
        <h2 className="text-center">
          Щоб почати - зареєструйся і попроси свого виховника добавити твою пробу)
        </h2>
      </div>
    );
  }

  return <Accordion user={user} />;
}
