import { NavBar } from "./components/layout/navbar"
import Accordion from "./components/accordion/accordion"

function App() {
  return(
        <html lang="en">
        <body className="bg-[#000] text-black w-full">
           <NavBar/>
          <Accordion/>
        </body>
        </html>
  )
}

export default App
