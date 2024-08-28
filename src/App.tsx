import { NavBar } from "./components/layout/navbar"
import Accordion from "./components/accordion/accordion"
import { useUserStore } from "./lib/auth/useUser.tsx"
import AccordionUserComponent from "./components/user-accordion/accordion"

function App() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  return (
    <div>
      <NavBar />
      {user?.roles[0] === "FOREMAN" ? (
        <Accordion />
      ) : (
        <AccordionUserComponent />
      )}
    </div>
  )
}

export default App
