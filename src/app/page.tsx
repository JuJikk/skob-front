import Accordion from "@/components/accordion/accordion";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
    const { userId } = auth();
  return (
    <>
      {userId ? <Accordion/>:
            <div className="w-full justify-center align-middle mt-8">
                <h1 className="text-center">Скоб! Це твоя онлайн проба</h1>
                <h2 className="text-center">Щоб почати - зареєструйся і попроси свого виховника добавити твою пробу)</h2>
            </div>
        }
    </>
  );
}
