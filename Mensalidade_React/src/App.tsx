import { ClientList } from "./components/client-list"
import { Header } from "./components/header"
import { SideBar } from "./components/sidebar/side-bar"

function App() {
  return (
    <>
    <SideBar/>
    <div className="max-w-[1206px] mx-auto flex flex-col">  
      <Header />  
      <ClientList/>
    </div>    
    </>
  )
}

export default App
