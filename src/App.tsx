import { useDisclosure } from "@nextui-org/react"
import Accordion from "./components/accordion/accordion"
import { NavBar } from "./components/layout/navbar"
import GenderModal from "./components/modal/gender-modal/index.tsx"
import AccordionUserComponent from "./components/user-accordion/accordion"
import { useUserStore } from "./lib/auth/useUser.ts"
import { useEffect } from "react"

function App() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (!user?.sex) {
      onOpen()
    }
  }, [user?.sex, onOpen])

  return (
    <div>
      <GenderModal userEmail={user?.email} isOpen={isOpen} onOpenChange={onOpenChange} />
      <NavBar />
      {user?.roles[0] === "SCOUT" ? (
          <AccordionUserComponent />
      ) : (
        <Accordion />
      )}
    </div>
  )
}

export default App
