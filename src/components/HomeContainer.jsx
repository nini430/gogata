import React from 'react';
import delivery from '../img/delivery.png';
import hero from '../img/heroBg.png';
import I1 from '../img/i1.png';

import { heroData } from '../utils/data';






const HomeContainer = () => {
  return (
    <section
      className=' grid  grid-cols-1 gap-10 md:gap-2  md:grid-cols-2 w-full'
      id='home'>
      <div className='flex-1 py-2 flex flex-col items-start justify-center  gap-6'>
        <div className='flex items-center gap-2 bg-orange-100 px-4 py-1 rounded-full'>
          <p className='text-base text-orange-500 font-semibold'>
            Bike Delivery
          </p>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-white justify-center drop-shadow-xl'>
            <img
              src={delivery}
              alt='delivery'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
          The fastest delivery in{' '}
          <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>
            Your City
          </span>
        </p>
        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          necessitatibus accusamus consequuntur tempore esse blanditiis maiores
          amet nisi beatae cupiditate?
        </p>
        <button className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto'>
          Order now
        </button>
      </div>

      <div className='relative flex-1 py-2 flex items-center'>
        <img className='w-full md:w-auto h-420 md:h-650 ml-auto' src={hero} alt='hero' />

        <div className='w-full h-full absolute top-0 left-0  flex items-center justify-center gap-2 flex-wrap'>
            {heroData&& heroData.map(item=>(
                <div key={item.id} className=" py-2 bg-cartOverlay backdrop:blur-md rounded-3xl p-4 flex flex-col items-center justify-center drop-shadow-lg">
                <img className="lg:w-40 w-20 xl:-mt-20 -mt-10" src={item.imageSrc} alt="icecream1"/>
                <p className="lg:text-xl text-base font-semibold text-textColor mt-2 lg:mt-4">{item.name}</p>
                <p className="lg:text-sm text-[12px] text-lightText font-semibold my-1 lg:my-3">{item.desc}</p>
                <p className="text-sm font-semibold text-headingColor"><span className="text-red-600">$</span>{item.price}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
