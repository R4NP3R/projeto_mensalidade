import { motion } from "framer-motion"
import { ClipboardList, SquareChevronLeft, SquareChevronRight, UserRoundPlus } from "lucide-react"
import { ComponentProps, useState } from "react"
import { Link } from "react-router-dom"

interface Props extends ComponentProps<'div'> {
}

// const variants = {
//   initial: {opacity: 0, x: -320},
//   open: { opacity: 1, x: 0 },
// }

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
        // variants={variants}
        // initial="initial"
        // animate="open"
        // transition={{ ease: "linear" }}        
        className="bg-slate-200 w-1/6 h-full fixed p-4 z-50">
          <div className="flex items-center relative border-b border-slate-400 pb-2">
            <img className="w-12 mr-4" src="src/assets/muscle.svg" alt="academy icon"/>   
            <h1 className="font-bold text-lg">Academy</h1>
            <SquareChevronLeft onClick={switchSideBarState}  size={32} className="cursor-pointer absolute right-0 top-1"/>
          </div> 
          <div className="w-full">          
          <Link to="/" onClick={() => (setIsActive(false))} className="flex p-2 mt-2 bg-slate-300 rounded-md cursor-pointer items-center">
            <ClipboardList size={20} />
            <p className="ml-2">Lista de clientes</p>
          </Link>
          <Link to="/register-client" onClick={() => (setIsActive(false))} className="flex p-2 mt-2 bg-slate-300 rounded-md cursor-pointer items-center">
            <UserRoundPlus size={20} />
            <p className="ml-2">Adicionar cliente</p>
          </Link>
          {/* <Link to="/" className="flex p-2 mt-2 bg-slate-300 rounded-md cursor-pointer items-center">
            <UserRoundCog size={20} />
            <p className="ml-2">Editar cliente</p>
          </Link> */}
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