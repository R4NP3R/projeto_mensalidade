
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<'td'> {

}

export const TableCell = ({className, ...props}: Props) => {
  return <td {...props} className={twMerge("py-2 px-4 text-sm relative", className)}/>
}