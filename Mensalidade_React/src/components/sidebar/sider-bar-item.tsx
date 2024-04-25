import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface Props {
  Icon: LucideIcon,
  text: string 
  link: string
}

export const SideBarItem = ({Icon, text, link, ...props}: Props) => {
  return (
    <Link to={link} className="flex p-2 mt-2 bg-slate-300 rounded-md cursor-pointer items-center" {...props}>
      <Icon size={20} />
      <p className="ml-2">{text}</p>
    </Link>
  )
}