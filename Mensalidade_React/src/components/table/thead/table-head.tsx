import { ComponentProps } from "react"
import { TableHeader } from "../table-header"

interface Props extends ComponentProps<'thead'> {}

export const TableHead = ({...props}:Props) => {
  return (
    <thead {...props}>
          <tr className="border-slate-400 rounded-lg">
            <TableHeader style={{width: 48}} className="rounded-l-lg">
              <input type="checkbox" />
            </TableHeader>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Data De inicio</TableHeader>
            <TableHeader>
              <div className="flex">
              <p>Pagamento</p>              
              </div>
            </TableHeader>
            <TableHeader className="rounded-r-lg"></TableHeader>
          </tr>
        </thead>
  )
}