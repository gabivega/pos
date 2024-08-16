import React from 'react'
import {ImSpinner8} from "react-icons/im"

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700'>
    <ImSpinner8
    className="animate-spin text-slate-300 ml-2" 
     ></ImSpinner8>
    
    </div>
  )
}

export default Spinner