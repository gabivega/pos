import React from 'react'
import {ImSpinner8} from "react-icons/im"

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-90 bg-gray-400'>
      <ImSpinner8 className="animate-spin text-blue ml-2 w-[25px] h-[25px]" />
      <p className="text-blue ml-2 text-bold text-xl">Cargando...</p>
    </div>
  )
}

export default Spinner