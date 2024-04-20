import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import relativeTime from "dayjs/plugin/relativeTime"
import { Check, ChevronLeft, ChevronRight, LoaderCircle, MoreHorizontal, UserRoundSearch, X } from "lucide-react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getClientData } from "../hooks/getClientData"
import { Clients } from "../interfaces/clients"
import { formatDate } from "../utils/formatDate"
import { formatPhoneNumber } from "../utils/formatPhoneNumber"
import { Button } from "./table/button"
import { ClientOptionMenu } from "./table/client-options-menu"
import { TableCell } from "./table/table-cell"
import { TableHeader } from "./table/table-header"


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const ClientList = () => {
  // Variables/Fuctions used on Search Bar
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    
    if(url.searchParams.has('search')) {    
      return url.searchParams.get('search') ?? ''
    }

    
    
    return ''
  })

  useEffect(() => {    
    const url = new URL(window.location.toString())      
    
    window.history.pushState({}, "" , url)
    if (search.length > 0) {
      url.searchParams.set('page', '1')
    }
  },[search])
    
  function onInputSearchChange(input: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(input.target.value)
    setCurrentPage(1)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)

    window.history.pushState({}, "" , url)
    
    setSearch(search)
    setPage(1)
  }


  function setCurrentPage(page?: number) {
    const url = new URL(window.location.toString())   
    
    url.searchParams.set('page', String(page))
    
    window.history.pushState({}, "" , url)    

    if (page)
    setPage(page)
  } 

  // Variables/Fuctions used on <tbody/>
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

  

  // Variables/Fuctions used on <tfoot/>
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
  
    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
  
    return 1
  })

  function goToFirstPage() {
    setCurrentPage(1)
  }
  
  function goToLastPage() {
    setCurrentPage(totalPages)
  }
  
  function goToNextPage() {
    setCurrentPage(page + 1)
  }
  
  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  // Fetch with react Query
  const {clients, isLoading, data} = getClientData(page -1, search)  
  const quantity = data?.total
    

  // General Variables
  const totalPages = quantity && Math.ceil(quantity / 10)
  return (
    <>
    <div className="inline-flex items-center p-1 border border-slate-400 focus-within:border-slate-500 w-64 rounded-md">
        <UserRoundSearch className="mx-1" width={20}/>
        <input onChange={onInputSearchChange} value={search} className="w-full h-full bg-transparent focus:outline-none" type="text" placeholder="buscar cliente" />
    </div>
    <div className="w-full mt-4">         
      <table className="w-full">
        <thead >
            <tr className="border-slate-400 rounded-lg">
              <TableHeader style={{width: 48}} className="rounded-l-lg">
                <input type="checkbox" />
              </TableHeader>
              <TableHeader className="w-[485px]">Cliente</TableHeader>
              <TableHeader className="w-[233px]">Data De inicio</TableHeader>
              <TableHeader>Pagamento</TableHeader>
              <TableHeader className="rounded-r-lg"></TableHeader>
            </tr>
          </thead>        
        <tbody  className="w-full">
          {data?.clients.length === 0 && <tr>
              <td colSpan={5}>{
                <div className="h-[56px] w-[1206px] bg-slate-200 flex justify-center items-center">
                    Nenhum Cliente Encontrado
                </div> 
              }
              </td>
            </tr>}
          {isLoading && (
            <tr>
              <td colSpan={5}>{
                <div className="h-[569px] w-[1206px] bg-slate-200 flex justify-center items-center">
                    <LoaderCircle className="animate-spin"/>
                </div> 
              }
              </td>
            </tr>
          )}         
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
        <tfoot className="w-full">
          <tr>
            <TableCell colSpan={1} className="rounded-bl-lg py-4 px-2 w-[48px]">
                <Button onClick={goToPreviousPage} disabled={page === 1}>
                  <ChevronLeft size={18} className="py-1 px-1"/>
                </Button>
            </TableCell>
            <TableCell colSpan={3} className="w-[1070px]">
              <div className="w-full flex items-center justify-center ">
                  <Button onClick={goToFirstPage} disabled={page === 1} list>
                    <p className="text-xs w-4 h-4">1</p>
                  </Button>
                  <Button list>
                    <MoreHorizontal size={18}/>
                  </Button>
                  <Button list onClick={goToLastPage} disabled={page === totalPages}>
                    <p className="text-xs w-4 h-4">{totalPages ? totalPages : 0}</p>
                  </Button>
              </div>
            </TableCell>
            <TableCell colSpan={1} className="rounded-br-lg text-end py-2 px-2 w-[58px]">
                <Button onClick={goToNextPage} disabled={page === totalPages}>
                <ChevronRight size={18} className="py-1 px-1" />
                </Button>
            </TableCell>
          </tr>
        </tfoot>
      </table>
    </div>
    </>
  )
}