import React from 'react'
import {FaStore, FaCreditCard,FaTruckMoving  } from "react-icons/fa"

const InfoSection = () => {
  return (
    <div className='hidden xs:flex flex-row items-center gap-4 md:gap-10 justify-center mx-auto my-10 h-120'>
      <div className='bg-slate-100 border-[1px] border-slate-200 rounded sm:h-[100px] sm:w-[220px] p-5 flex items-center gap-4 drop-shadow-md'>
        <FaCreditCard size={30} className='text-blue' />
        <div className='flex flex-col justify-start select-none'>
          <h3 className='text-sm sm:text-regular font-semibold'>Tarjetas de Crédito</h3>
          <p className='text-xs hover:cursor-pointer text-cyan-600'>Ver promociones</p>
        </div>
      </div>
      <div className='bg-slate-100 border-[1px] border-slate-200 rounded sm:h-[100px] sm:w-[220px] p-5 flex items-center gap-4 drop-shadow-md'>
        <FaStore size={30} className='text-blue' />
        <div className='flex flex-col justify-start select-none'>
          <h3 className='text-sm sm:text-regular font-semibold'>Retiro en Tienda</h3>
          <p className='text-xs hover:cursor-pointer text-cyan-600'>Ver Ubicaciones</p>
        </div>
      </div>
      <div className='bg-slate-100 border-[1px] border-slate-200 rounded sm:h-[100px] sm:w-[220px] p-5 flex items-center gap-4 drop-shadow-md'>
        <FaTruckMoving size={30} className='text-blue' />
        <div className='flex flex-col justify-start select-none'>
          <h3 className='text-sm sm:text-regular font-semibold'>Envíos a domicilio</h3>
          <p className='text-xs hover:cursor-pointer text-cyan-600'>Calcular Costos</p>
        </div>
      </div>
      
    </div>
  )
}

export default InfoSection