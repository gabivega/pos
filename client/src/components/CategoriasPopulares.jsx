import React from 'react'
import {FaTools, FaPaintRoller, FaKey, FaToilet} from "react-icons/fa"
import {MdElectricBolt} from "react-icons/md"
import {GiScrew} from "react-icons/gi"

const CategoriasPopulares = () => {
  return (       
      <div className='flex m-auto justify-center my-4 gap-2 sm:gap-4 flex-wrap w-1/2'>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <FaTools size={40}/>
          <p>Herramientas</p>
        </div>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <MdElectricBolt size={40}/>
          <p>Electricidad</p>
        </div>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <GiScrew size={40} />
          <p>Bulonería</p>
        </div>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <FaPaintRoller size={40}/>
          <p>Pinturería</p>
        </div>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <FaKey size={40}/>
          <p>Herrajes</p>
        </div>
        <div className='flex flex-col border-b-[1px] border-r-[1px] drop-shadow-md hover:scale-105 hover:cursor-pointer justify-center items-center p-2 text-blue'>
          <FaToilet size={40}/>
          <p>Sanitarios</p>
        </div>  
      </div>
  )
}

export default CategoriasPopulares