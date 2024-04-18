import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import relativeTime from "dayjs/plugin/relativeTime"
import { ChevronLeft, ChevronRight, MoreHorizontal, UserRoundSearch } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { getClientData } from "../hooks/getClientData"
import { Button } from "./table/button"
import { TableCell } from "./table/table-cell"
import { TableBody } from "./table/tbody/table-body"
import { TableHead } from "./table/thead/table-head"


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const ClientList = () => {  
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
  
      if (url.searchParams.has('page')) {
        return Number(url.searchParams.get('page'))
      }
  
      return 1
    })
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
  
    if(url.searchParams.has('search')) {
  
      return url.searchParams.get('search') ?? ''
    }
  
    return ''
  })

  const {data} = getClientData(page -1, search)  

  function setCurrentPage(page?: number) {
    const url = new URL(window.location.toString())   
  
    url.searchParams.set('page', String(page))
  
    window.history.pushState({}, "" , url)    

    if (page)
    setPage(page)
  } 

  function onInputSearchChange(input: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(input.target.value)
    setPage(1)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)

    window.history.pushState({}, "" , url)
    
    setSearch(search)
  }

  
  
    
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
  
    const totalPages = data && Math.ceil(data?.total / 10)


  return (
    <>
    <div className="inline-flex items-center p-1 border border-slate-400 focus-within:border-slate-500 w-64 rounded-md">
        <UserRoundSearch className="mx-1" width={20}/>
        <input onChange={onInputSearchChange} value={search} className="w-full h-full bg-transparent focus:outline-none" type="text" placeholder="buscar cliente" />
    </div>
    <div className="w-full mt-4">         
      <table className="w-full">
        <TableHead />
        <TableBody clients={data?.clients}/>
        <tfoot className="w-full">
          <tr>
            <TableCell colSpan={1} className="rounded-bl-lg py-4 px-2">
                <Button onClick={goToPreviousPage} disabled={page === 1}>
                  <ChevronLeft size={18} className="py-1 px-1"/>
                </Button>
            </TableCell>
            <TableCell colSpan={3} className="">
              <div className="w-full flex items-center justify-center">
                  <Button onClick={goToFirstPage} disabled={page === 1} list>
                    <p className="text-xs w-4 h-4">1</p>
                  </Button>
                  <Button list>
                    <MoreHorizontal size={18}/>
                  </Button>
                  <Button list onClick={goToLastPage} disabled={page === totalPages}>
                    <p className="text-xs w-4 h-4">{totalPages}</p>
                  </Button>
              </div>
            </TableCell>
            <TableCell colSpan={1} className="rounded-br-lg text-end py-2 px-2">
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