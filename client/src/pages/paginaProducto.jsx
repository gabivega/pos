import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const PaginaProducto = (id) => {

const producto = useSelector(state => state.currentProduct)

const {
  titulo,
  precioVenta,
  descripcion,
  imagen,
  marca
} = producto;

const ScrollToTopOnPageLoad = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
   ScrollToTopOnPageLoad()
  }, [])
  
  return (
    <div className='flex h-full flex-col select-none'>      
      <div className="container mx-auto py-8 h-[calc(100vh-100px)] ">
      <div className="flex border-b-[1px] border-gray-400" >
        <div className="w-2/3 flex justify-center items-center ">
          <img src={imagen} alt={titulo} className="w-1/2" />
        </div>
        <div className="flex flex-col w-1/3 p-4 border-l-[1px] border-gray-400 justify-center items-center">
          <div className='flex flex-col w-full p-2 pb-0 border-b-[1px] border-gray-200 justify-center items-center'>
            <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
            <p className="text-gray-800 mb-4 text-lg font-semibold">{marca}</p>
            <p className="text-gray-600 mb-4">${precioVenta}</p>
          </div>          
          <div className='flex flex-col w-full items-center p-4 gap-4'>
            <button className="bg-sky-800 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded w-48">
              Agregar al carrito
            </button>
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-48">
              Comprar
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-semibold text-gray-700'>Descripcion</h1>
        <h1 className='text-xl font-semibold text-gray-700'>{titulo}</h1>
        <h1 className='text-xl font-semibold text-gray-700'>Marca: {marca}</h1>
        <p>{descripcion}</p>
      </div>
    </div>
    </div>
  );
  
}

export default PaginaProducto