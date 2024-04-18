import { Check, Pen, X } from "lucide-react"
import { ComponentProps, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { deleteClient, } from "../../../hooks/deleteClient"
import { renewClientWithLatePayment } from "../../../hooks/renewClientWithLatePayment"
import { Clients } from "../../../interfaces/clients"

interface Props extends ComponentProps<'div'> {
  client: Clients
}

export const ClientOptionMenu = ({client, ...props}:Props) => {

  const [removeBoxIsVisible, setRemoveBoxIsVisible] = useState(false)
  const [renewBoxIsVisible, setRenewBoxIsVisible] = useState(false)

  const { mutate: mutateRemove, isSuccess: removeIsSucess } = deleteClient()
  const {mutate: mutateRenew, isSuccess: renewIsSucess } = renewClientWithLatePayment()

  // async function removeClient(gymId: string, clientId:string) {
  //   await axios.delete(`http://localhost:3333/clients/${gymId}/${clientId}/remove`)
  //   await axios.get('http://localhost:3333/clients/gym/black-and-white-academy')
  // }

  function removeClient(gymId: string, clientId:string) {
    const clientInfo = {
      gymId,
      clientId
    }
    mutateRemove(clientInfo)
  }

  function renewClient(gymId: string, clientId:string) {
    const clientInfo = {
      gymId,
      clientId
    }

    mutateRenew(clientInfo)
  }

  useEffect(() => {
    setRemoveBoxIsVisible(false)
    setRenewBoxIsVisible(false)
  }, [removeIsSucess, renewIsSucess])

  

  

  return (    
    <>
    <div {...props} className="absolute z-40 top-[45px] left-[-40px] bg-[#c2ccd8] p-2 rounded-lg">     
      {client.latePayment && 
        <span className="flex items-center p-1 text-emerald-400 cursor-pointer rounded-md hover:bg-slate-200" onClick={() => setRenewBoxIsVisible(true)}> 
          <Check size={12}/>
          <p className="ml-2">Renovar</p>
        </span>
      }
      <span className="flex items-center p-1 text-red-400 cursor-pointer rounded-md hover:bg-slate-200" onClick={() => setRemoveBoxIsVisible(true)}>
        <X size={12}/>
        <p className="ml-2">Remover</p>
      </span>
      <span className="flex items-center p-1 text-cyan-400 cursor-pointer rounded-md hover:bg-slate-200">
        <Pen size={12}/>
        <p className="ml-2">Editar</p>        
      </span>      
    </div>

    {renewBoxIsVisible && (
      <div onClick={() => setRenewBoxIsVisible(false)} className={twMerge("bg-black/40 fixed flex top-0 left-0 w-full h-full z-40 items-center", )}>
      <div className="relative bg-slate-200 w-[350px] h-[85px] flex flex-col m-auto pt-4 items-center rounded-lg text-sm border-emerald-600 border-2">
        <X onClick={() => setRemoveBoxIsVisible(false)} size={20} className="absolute right-0 top-0 cursor-pointer"/>
        <p>Realmente deseja renovar a mensalidade do Cliente?</p>
        <div className="flex justify-between w-[80px] mt-2">
          <Check onClick={() => renewClient(client.gym, client.id)} size={30} className="text-emerald-400 cursor-pointer p-1 rounded-lg hover:bg-slate-300 hover:text-emerald-600"/>
          <X onClick={() => setRenewBoxIsVisible(false)} size={30} className="text-red-400 cursor-pointer p-1 hover:bg-slate-300 hover:text-red-600 rounded-lg"/>
        </div>
      </div>    
    </div>
    )}
    
    {removeBoxIsVisible && (
    <div onClick={() => setRemoveBoxIsVisible(false)} className={twMerge("bg-black/40 fixed flex top-0 left-0 w-full h-full z-40 items-center ", )}>
      <div className="relative bg-slate-200 w-[350px] h-[85px] flex flex-col m-auto pt-4 items-center rounded-lg text-sm border-red-600 border-2">
        <X onClick={() => setRemoveBoxIsVisible(false)} size={20} className="absolute right-0 top-0 cursor-pointer"/>
        <p>Realmente deseja Remover o Cliente?</p>
        <div className="flex justify-between w-[80px] mt-2">          
          <Check onClick={() => removeClient(client.gym, client.id)} size={30} className="text-emerald-400 cursor-pointer p-1 rounded-lg hover:bg-slate-300 hover:text-emerald-600"/>
          <X onClick={() => setRemoveBoxIsVisible(false)} size={30} className="text-red-400 cursor-pointer p-1 hover:bg-slate-300 hover:text-red-600 rounded-lg"/>
        </div>
      </div>
    </div>
    )}

    
    </>
  )
}