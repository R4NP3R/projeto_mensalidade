import { motion } from "framer-motion"
import { ClipboardList, SquareChevronLeft, SquareChevronRight, UserRoundCog, UserRoundPlus } from "lucide-react"
import { ComponentProps, useState } from "react"
import { SideBarItem } from "./sider-bar-item"

interface Props extends ComponentProps<'div'> {
}

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const SideBar = ({...props}: Props) => {

  const [isActive , setIsActive] = useState(Boolean)


  function switchSideBarState () {
    setIsActive(!isActive)
  }

  return (
    <div {...props} >
      {isActive ? (
        <>
        <motion.div
        animate={isActive ? "open" : "closed"}
        variants={variants}
        className="bg-slate-200 w-1/6 h-full fixed p-4 z-50">
          <div className="flex items-center relative border-b border-slate-400 pb-2">
            <img className="w-12 mr-4" src="src/assets/muscle.svg" alt="academy icon"/>   
            <h1 className="font-bold text-lg">Academy</h1>
            <SquareChevronLeft onClick={switchSideBarState}  size={32} className="cursor-pointer absolute right-0 top-1"/>
          </div> 
          <div>
          <SideBarItem Icon={ClipboardList} text="Lista de clientes" />
          <SideBarItem Icon={UserRoundPlus} text="Adicionar cliente" />
          <SideBarItem Icon={UserRoundCog} text="Editar cliente" />
          </div>   
        </motion.div>        
        <div className="bg-black/40 fixed w-full h-full z-40"></div>
        </>
        
      ) : (
        <SquareChevronRight onClick={switchSideBarState} className="fixed top-4 left-4 cursor-pointer" size={32}/>
      )}
    </div>
    
  )
}