import { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

interface Props extends ComponentProps<'th'> {

}
export const TableHeader = ({...props}:Props) => {
  return <th {...props} className={twJoin("py-2 px-4 text-sm text-left border-slate-400 bg-slate-300", props.className)} />
}