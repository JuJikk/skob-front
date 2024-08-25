import { NavBar } from "./components/layout/navbar"
import Accordion from "./components/accordion/accordion"
import { useUserStore } from "./lib/auth/useUser.tsx"

function App() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }))

  return(
        <html lang="en">
        <body className="bg-[#000] text-black w-full">
           <NavBar/>
           {user?.roles[0] === "FOREMAN" ? (
             <Accordion/>
           ) : (
             <div>Наразі твоя проба як не адміна ще не готова</div>
           )}
        </body>
        </html>
  )
}

export default App
