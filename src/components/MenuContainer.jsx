import React from 'react'
import { useState } from 'react';
import {MdFastfood} from "react-icons/md";
import { categories } from '../utils/data';
import {motion} from "framer-motion"

 const MenuContainer = () => {
    const [filter,setFilter]=useState("chicken");
  return (
    <section className="w-full py-6" id="menu">
        <div className="w-full flex flex-col items-center justify-center">
        <p className="mr-auto text-2xl font-semibold capitalized text-headingColor relative before:absolute before:content before:w-16 before:h-1 before:rounded-lg before:-bottom-2 before:left-0 transition-all ease-in-out duration-100 before:bg-gradient-to-br from-orange-400 to-orange-600">Our hot Dishes</p>
            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none flex-wrap">
                {categories.map(category=>(
                     <motion.div whileTap={{scale:0.75}} onClick={()=>setFilter(category.urlParamName)} key={category.id} className={`group hover:bg-red-600 ${category.urlParamName===filter? "bg-red-600":"bg-white"} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center`}>
                     <div className={`w-10 h-10 rounded-full shadow-lg ${category.urlParamName===filter?"bg-cartOverlay":"bg-red-600"}  group-hover:bg-cartOverlay flex justify-center items-center`}>
                         <MdFastfood className={` text-lg ${category.urlParamName===filter?"text-textColor":"text-cartOverlay"} group-hover:text-textColor`}/>
                     </div>
                     <p className={`text-sm ${category.urlParamName===filter?"text-white":"text-textColor"} group-hover:text-white`}>{category.name}</p>
                 </motion.div>
                ))}
               
            </div>
        </div>
    </section>
  )
}

export default MenuContainer;