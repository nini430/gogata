import React,{useEffect, useRef} from 'react'
import I1 from "../img/i1.png"
import {MdShoppingBasket} from "react-icons/md"
import {motion} from "framer-motion"



 const RowContainer = ({flag,data,scroll}) => {
  const rowContainerRef=useRef();

  useEffect(()=>{
    rowContainerRef.current.scrollLeft+=scroll;
  },[scroll])

  return (
    <div ref={rowContainerRef}  className={`w-full my-12 flex items-center  gap-3  ${flag?'md:overflow-x-scroll scrollbar-none scroll-smooth':'overflow-x-hidden flex-wrap'}`}>
      {data && data.map(item=>(
           <div className='md:w-350 w-300 min-w-[300px] md:min-w-[350px] h-auto0 my-12 flex flex-col items-center bg-cartOverlay  backdrop-blur-lg p-2 hover:drop-shadow-lg'>
           <div className="w-full flex items-center justify-between">
             <motion.img whileHover={{scale:1.2}} className="w-40 h-40 drop-shadow-2xl -mt-8" src={item?.imgUrl} alt=""/>
             <motion.div whileTap={{scale:0.75}} className="w-8 h-8 bg-red-500 rounded-full flex justify-center items-center cursor-pointer hover:shadow-md">
               <MdShoppingBasket className="text-white"/>
             </motion.div>
           </div>
           <div className="w-full flex items-end justify-end flex-col">
               <p className="text-textColor font-semibold text-base md:text-lg">{item.title}</p>
               <p className="mt-1 text-sm text-gray-500 ">{item.calories} calories</p>
               <div className="flex items-center gap-8">
                       <p className="text-lg text-headingColor  font-semibold"><span className="text-sm text-red-500">$</span>{item.price}</p>
               </div>

               
           </div>
       </div>
      ))}
         
    </div>
  )
}

export default RowContainer;