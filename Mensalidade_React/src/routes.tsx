import { createBrowserRouter } from "react-router-dom";
import { ClientList } from "./components/client-list";
import { Header } from "./components/header";
import { RegisterClient } from "./components/register-client";
import { SideBar } from "./components/sidebar/side-bar";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <SideBar/>
      <div className="max-w-[1206px] mx-auto flex flex-col">   
      <Header pageName="Clientes" activeQuantity />  
      <ClientList/>
      </div>
      </>
    )
  },
  {
    path: '/register-client',
    element: (
      <>
      <SideBar/>
      <div className="max-w-[1206px] mx-auto flex flex-col">  
      <Header pageName="Registrar Cliente" />  
      <RegisterClient />
      </div>
      </>
    )
  }
])