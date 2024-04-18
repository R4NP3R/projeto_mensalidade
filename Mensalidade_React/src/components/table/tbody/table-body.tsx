import dayjs from "dayjs";
import { Check, MoreHorizontal, X } from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";

import { Clients } from "../../../interfaces/clients";
import { formatDate } from "../../../utils/formatDate";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { Button } from "../button";
import { TableCell } from "../table-cell";
import { ClientOptionMenu } from "./client-options-menu";

interface Props extends ComponentProps<'tbody'> {
  clients: Clients[] | undefined
}

export const TableBody = ({clients, ...props}: Props) => {
  const [openClientMenuId, setOpenClientMenuId] = useState<String | null>(null)
  const clientOptionMenuRef = useRef<HTMLDivElement>(null);

  function handleOpenClientMenuId(cliente: Clients) {    
    if (openClientMenuId === cliente.id) {
      setOpenClientMenuId(null); 
    } else {
      setOpenClientMenuId(cliente.id);
    } 

  }  


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clientOptionMenuRef.current && !clientOptionMenuRef.current.contains(event.target as Node)) {
        setOpenClientMenuId(null); 
      }} 

    document.addEventListener("mousedown", handleClickOutside);  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }


  }, [])
  return (
    <tbody {...props} className="w-full">
          {clients?.map((client, i) => {
            return ( 
              <tr key={i} className="group/payment first:border-0 border-t border-slate-400 hover:bg-slate-300/40">
                <TableCell style={{width: 48}} className="py-2 px-4 text-sm">
                    <input type="checkbox" />
                </TableCell>
                <TableCell className="py-2 px-4 text-sm w-[485px]">
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold">{client.name}</span>
                    <span className="font-thin">{formatPhoneNumber(client.phoneNumber)}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 px-4 text-sm">{formatDate(client.initialDate)}</TableCell>
                <TableCell className="py-2 px-4 text-sm text-left">
                {client.latePayment ? (
                  <div className="flex items-center text-red-600">
                  <X width={20}/>                  
                  <p className="ml-2">Atrasado</p>
                  <p className="ml-4 w-[72px] text-black/40 group-hover/payment:hidden">{dayjs().to(client.latePayment)}</p>
                  <p className="ml-4 w-[72px] hidden text-black/40 group-hover/payment:block">{formatDate(client.latePayment)}</p>                 
                </div>
                ) : (
                  <div className="flex items-center text-emerald-500">
                    <Check width={20}/>
                    <p className="ml-2">Em dia</p>
                    <p className="ml-4 w-[72px] opacity-0 text-black/40 group-hover/payment:opacity-100">{formatDate(client.paymentDayDate)}</p>
                  </div>
                )}
                </TableCell>
                <TableCell style={{width: 48}} className="py-2 px-4 text-sm">
                  <Button onClick={()=> handleOpenClientMenuId(client)}>
                    <MoreHorizontal width={16} height={16}/>                                     
                  </Button>
                  {openClientMenuId === client.id && (<div ref={clientOptionMenuRef}><ClientOptionMenu className="client-option-menu" client={client}/></div>)}    
                </TableCell>
                
              </tr>
            )
          })}
        </tbody>
  )
}