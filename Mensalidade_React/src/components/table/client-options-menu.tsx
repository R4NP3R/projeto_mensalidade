import { zodResolver } from "@hookform/resolvers/zod"
import { Binary, CalendarCheck, Check, Home, KeyRound, MapPin, Pen, Phone, User, X } from "lucide-react"
import { ComponentProps, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { deleteClient, } from "../../hooks/deleteClient"
import { putClientData } from "../../hooks/putClient"
import { renewClientWithLatePayment } from "../../hooks/renewClientWithLatePayment"
import { Clients } from "../../interfaces/clients"

interface Props extends ComponentProps<'div'> {
  client: Clients
}

function removeCharacters(text: string) {
  return text.replace(/\D/g, '')
}

const clientInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  cpf: z.string().length(11 , 'O CPF deve ter 11 caracteres'),
  phoneNumber: z.string().length(11, 'O Telefone deve ter 11 caracteres'),
  paymentDay: z.coerce.number().min(1).max(30),
  adress: z.string(),
  adressNumber: z.string()
})

export type clientInfoSchema = z.infer<typeof clientInfoSchema>


export const ClientOptionMenu = ({client, ...props}:Props) => {
  const [removeBoxIsVisible, setRemoveBoxIsVisible] = useState(false)
  const [renewBoxIsVisible, setRenewBoxIsVisible] = useState(false)
  const [editBoxIsVisible, setEditBoxIsVisible] = useState(false)

  const {register, 
    handleSubmit, 
    formState: {errors},
    getValues,
  } = useForm<clientInfoSchema>({
    resolver: zodResolver(clientInfoSchema)
  })


  const {mutate: mutateRemove, isSuccess: removeIsSucess } = deleteClient()
  const {mutate: mutateRenew, isSuccess: renewIsSucess } = renewClientWithLatePayment()
  const {mutate: mutateEdit, isSuccess: editIsSucess } = putClientData()
  

  function handleEditClientInfo(data: clientInfoSchema) {
    mutateEdit(data)
  }


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
    setEditBoxIsVisible(false)
  }, [removeIsSucess, renewIsSucess, editIsSucess])

  const paymentDayDate = new Date(client.paymentDayDate)
  const paymentDay = paymentDayDate.getDate()




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
      <span className="flex items-center p-1 text-cyan-400 cursor-pointer rounded-md hover:bg-slate-200" onClick={() => setEditBoxIsVisible(true)}>
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

    {editBoxIsVisible && (
    <div className={twMerge("bg-black/40 fixed flex top-0 left-0 w-full h-full z-40 items-center ", )}>
      <div className="relative bg-slate-200 w-[400px] h-[430px] flex flex-col m-auto pt-4 items-center rounded-lg text-sm border-cyan-600 border-2">
        <X onClick={() => setEditBoxIsVisible(false)} size={20} className="absolute right-0 top-0 cursor-pointer"/>
        <p>Editar Cliente</p>
        <form onSubmit={handleSubmit(handleEditClientInfo)} className="w-full p-4 flex flex-col items-center">
        <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <Binary size={28}/>
            <input autoFocus disabled {...register('id', {value: client.id}) } className="w-full ml-2 bg-transparent font-bold opacity-60 focus:outline-none" type="text" placeholder="Nome" />
          </div>
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <User size={28}/>
            <input autoFocus {...register('name', {value: client.name}) } className="w-full ml-2 bg-transparent font-bold focus:outline-none" type="text" placeholder="Nome" />
          </div>
          <div className="w-full p-1 rounded-lg border-slate-400 border mb-2">
            <div className="flex">
              <KeyRound size={28}/>
              <input {...register('cpf', {value: removeCharacters(client.cpf)})} className="w-full ml-2 bg-transparent font-bold focus:outline-none" type="text" placeholder="CPF" />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.cpf?.message}</span></div>}
          </div>
          <div className="flex flex-col w-full p-1 rounded-lg border-slate-400 border mb-2">
            <div className="flex">
              <Phone size={28}/>
              <input
              type="text" placeholder="Número de telefone" 
              {...register('phoneNumber', {value: client.phoneNumber})}               
              className="w-full ml-2 bg-transparent font-bold focus:outline-none"
              />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.phoneNumber?.message}</span></div>}
          </div>
          <div className="flex flex-col w-full p-1 rounded-lg border-slate-400 border mb-2">
            <div className="flex">
              <CalendarCheck size={28}/>
              <input min={1} max={30} {...register('paymentDay', {value: Number(paymentDay)})} className="w-full ml-2 bg-transparent font-bold focus:outline-none" type="text" placeholder="Dia do pagamento" />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.paymentDay?.message}</span></div>}
          </div>
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <Home size={28}/>
            <input 
            type="text" placeholder="Endereço" 
            {...register('adress', {value: client.adress})} 
            className="w-full ml-2 bg-transparent font-bold focus:outline-none"             
            />
          </div>
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <MapPin size={28}/>
            <input {...register('adressNumber', {value: client.adressNumber})} className="w-full ml-2 bg-transparent font-bold focus:outline-none" type="number" placeholder="Número do endereço" />
          </div>          
          <div className="flex justify-between mt-2 w-[80px]">          
            <button type="submit">
              <Check size={30} className="text-emerald-400 cursor-pointer p-1 rounded-lg hover:bg-slate-300 hover:text-emerald-600"/>
            </button>
            <X onClick={() => setEditBoxIsVisible(false)}  size={30} className="text-red-400 cursor-pointer p-1 hover:bg-slate-300 hover:text-red-600 rounded-lg"/>
          </div>
        </form>        
      </div>
      <div></div>
    </div>
    )}
    </>
  )
}