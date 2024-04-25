import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarCheck, Check, Home, KeyRound, MapPin, Phone, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { redirect } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { createClient } from "../hooks/createClient"


const registerClientSchema = z.object({
  name: z.string(),
  cpf: z.string().length(11, 'O CPF deve ter 11 caracteres'),
  phoneNumber: z.string().length(11, 'O Telefone deve ter 11 caracteres'),
  paymentDay: z.coerce.number().min(0, '').max(30, ''),
  adress: z.string(),
  adressNumber: z.string()
})

export type registerClientInfoSchema = z.infer<typeof registerClientSchema>

export const RegisterClient = () => {
  const [registerSucess, setRegisterSucess] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const {mutate, isSuccess, error, isError} = createClient()
  const {register, handleSubmit, reset, formState: {errors}} = useForm<registerClientInfoSchema>({
    resolver: zodResolver(registerClientSchema)
  })

  function handleCreateClientInfo (data: registerClientInfoSchema) {
    mutate(data)
  }
  
  useEffect(() => {
    if (isSuccess) {
      setRegisterSucess(true)
      reset()
    }

    if (isError) {
      setRegisterError(true)
    }
    

  }, [isSuccess, isError])


  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(handleCreateClientInfo)} className="w-[680px] p-4 flex flex-col items-center">
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <User size={28}/>
            <input 
              autoFocus {...register('name')} 
              className="w-full ml-2 bg-transparent font-bold focus:outline-none" 
              type="text"
              placeholder="Nome" 
            />
          </div>
          <div className={twMerge("w-full p-1 rounded-lg border-slate-400 border mb-2", errors.cpf?.message && 'border-red-600')}>
            <div className="flex">
              <KeyRound size={28}/>
              <input 
                {...register('cpf')} 
                className="w-full ml-2 bg-transparent font-bold focus:outline-none" 
                type="text" 
                placeholder="123.456.789.10 (CPF)" 
              />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.cpf?.message}</span></div>}
          </div>
          <div className="flex flex-col w-full p-1 rounded-lg border-slate-400 border mb-2">
            <div className="flex">
              <Phone size={28}/>
              <input
                {...register('phoneNumber')}
                type="text" placeholder="(12) 34567-8910 (Telefone)"                            
                className="w-full ml-2 bg-transparent font-bold focus:outline-none"
              />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.phoneNumber?.message}</span></div>}
          </div>
          <div className="flex flex-col w-full p-1 rounded-lg border-slate-400 border mb-2">
            <div className="flex">
              <CalendarCheck size={28}/>
              <input
                {...register('paymentDay')}
                min={1} max={30}
                className="w-full ml-2 bg-transparent font-bold focus:outline-none" 
                type="text" placeholder="Dia do pagamento" 
              />
            </div>
            {<div className="w-full flex items-center justify-center"><span className="text-xs text-red-600">{errors.paymentDay?.message}</span></div>}
          </div>
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <Home size={28}/>
            <input 
              {...register('adress')}
              type="text" placeholder="Endereço"
              className="w-full ml-2 bg-transparent font-bold focus:outline-none"             
            />
          </div>
          <div className="flex w-full p-1 rounded-lg border-slate-400 border mb-2">
            <MapPin size={28}/>
            <input 
              {...register('adressNumber')}
              className="w-full ml-2 bg-transparent font-bold focus:outline-none" 
              type="number" 
              placeholder="Número do endereço" 
            />
          </div>
          <button type="submit" className="w-full p-1 bg-slate-400 rounded-lg text-slate-200">Cadastrar</button>
        </form>

      {registerSucess && 
      <div onClick={() => setRegisterSucess(false)} className={twMerge("bg-black/40 fixed flex top-0 left-0 w-full h-full z-40 items-center", )}>
        <div className="relative bg-slate-200 w-[350px] h-[100px] flex flex-col m-auto pt-4 items-center rounded-lg text-sm border-emerald-600 border-2">
          <X onClick={() => setRegisterSucess(false)} size={20} className="absolute right-0 top-0 cursor-pointer"/>
          <p className="font-bold text-lg">Cliente Cadastrado com sucesso</p>
          <div className="flex  justify-cente mt-2">
            <Check onClick={()=> redirect('/')} size={30} className="text-emerald-400 cursor-pointer p-1 rounded-lg hover:bg-slate-300 hover:text-emerald-600"/>
          </div>
        </div>    
      </div>
      }
      

      {registerError && 
      <div onClick={() => setRegisterError(false)} className={twMerge("bg-black/40 fixed flex top-0 left-0 w-full h-full z-40 items-center", )}>
      <div className="relative bg-slate-200 w-[430px] h-[120px] flex flex-col justify-center items-center m-auto pt-4 rounded-lg text-sm border-red-600 border-2">
        <X onClick={() => setRegisterError(false)} size={20} className="absolute right-0 top-0 cursor-pointer"/>
        <p className="font-bold text-lg text-center">{isError ? error.message : 'erro desconhecido'}</p>
        <div className="flex  justify-cente mt-2">
          <Check onClick={() => setRegisterError(false)} size={30} className="text-emerald-400 cursor-pointer p-1 rounded-lg hover:bg-slate-300 hover:text-emerald-600"/>
        </div>
      </div>    
    </div>
      }
    </div>
  )
}