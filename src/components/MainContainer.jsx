import React,{useState} from 'react'
import HomeContainer from './HomeContainer';
import {motion} from "framer-motion";
import {MdChevronLeft,MdChevronRight} from "react-icons/md"
import RowContainer from './RowContainer';
import {useStateValue} from "../context/stateProvider"
import MenuContainer from './MenuContainer';







const MainContainer = () => {
  const [{foodItems},dispatch]=useStateValue();
  const [scroll,setScroll]=useState(0);
  
  return (
    <div className="flex flex-col w-full justify-center items-center h-auto">
      <HomeContainer/>
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalized text-headingColor relative before:absolute before:content before:w-32 before:h-1 before:rounded-lg before:-bottom-2 before:left-0 transition-all ease-in-out duration-100 before:bg-gradient-to-br from-orange-400 to-orange-600">Our fresh & healthy fruits</p>
          <div className="hidden md:flex items-center gap-3">
            <motion.div onClick={()=>setScroll(-200)} whileTap={{scale:0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer  hover:shadow-lg">
              <MdChevronLeft className="text-lg text-white"/>
            </motion.div>
            <motion.div onClick={()=>setScroll(200)} whileTap={{scale:0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer  hover:shadow-lg">
              <MdChevronRight className="text-lg text-white"/>
            </motion.div>
          </div>
        </div>
          <RowContainer scroll={scroll}  flag={true} data={foodItems?.filter(item=>item.category==="fruits")}/>
      </section>
      <MenuContainer/>
    </div>
  )
}

export default MainContainer;
