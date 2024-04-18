import { LucideIcon } from "lucide-react"
import { ComponentProps } from "react"

interface Props extends ComponentProps<'div'> {
  Icon: LucideIcon,
  text: string 
}

export const SideBarItem = ({Icon, text, ...props}: Props) => {
  return (
    <div className="flex p-2 mt-2 bg-slate-300 rounded-md cursor-pointer items-center" {...props}>
      <Icon size={20} />
      <p className="ml-2">{text}</p>
    </div>
  )
}