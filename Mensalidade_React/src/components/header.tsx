import { ComponentProps } from "react"
import { getClientData } from "../hooks/getClientData"

interface Props extends ComponentProps<'header'>{
}


export const Header = ({...props}:Props) => {
  const quantity = getClientData().total

  return (
    <header {...props} className="flex my-4 items-center border-b border-slate-400 pb-3">
      <p className="font-bold text-3xl px-4 pb-0.5">Clientes</p>
      <span className="bg-slate-500 py-1 px-4 rounded-md text-sm text-slate-200 opacity-60">{quantity ? quantity : 0}</span>
    </header>
  )
}