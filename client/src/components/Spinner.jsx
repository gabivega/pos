import React from 'react'
import {ImSpinner8} from "react-icons/im"

const Spinner = () => {
  return (
    <div className='flex items-center'>
       {/* Cargando.. */}
    <ImSpinner8
    className="animate-spin text-slate-300 ml-2" 
     ></ImSpinner8>
    
    </div>
  )
}

export default Spinner