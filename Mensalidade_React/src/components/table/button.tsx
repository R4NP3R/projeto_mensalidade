import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<'button'> {
  list?: boolean
}

export const Button = ({list, className, ...props}: Props) => {
  return <button {...props} className={twMerge(
    'relative bg-slate-300 py-1 px-1 border-slate-400 rounded-md hover:scale-110', 
    list && 'mx-1', 
    props.disabled ? 'opacity-30 hover:scale-100 cursor-not-allowed' : 'opacity-100 hover:cursor-pointer',
    className
  )}/>
}