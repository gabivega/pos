import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, removeFromCart } from '../state/state'

const Carrito = () => {
  const dispatch = useDispatch()
  const productosCarrito = useSelector((state) => state.cart);
  
  const [carritoLocal, setCarritoLocal] = useState([...productosCarrito])
  const [combinedProducts, setCombinedProducts] = useState([]);
  // const [importeTotal, setImporteTotal] = useState(calcularImporteTotal(productosCarrito))

const productoRepetido = (id) => {
  console.log(carritoLocal);
  const productosCarrito = carritoLocal.filter((producto)=> producto._id === id);
    if(productosCarrito.length > 1) {
      console.log("true");
      return true
    } else {
      console.log("false");
      return false
    }   
}

const handleEliminarProducto = (_id) => {
  dispatch(removeFromCart({_id}))
  console.log(productosCarrito)
  console.log(carritoLocal);
  setCarritoLocal([...productosCarrito])
 // console.log(carritoLocal);
}


  return (
    <div className='min-h-screen bg-gray-100 overflow-y-auto'>
      <div className='max-w-3xl mx-auto p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Carrito de Productos</h1>
        {carritoLocal.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div>{carritoLocal.map((producto) => (
            <div key={producto._id} className='flex items-center border-b border-gray-300 py-4'>
              <div className='flex-shrink-0'>
                <img src={producto.imagen} alt={producto.titulo} className='w-16 h-16 object-cover rounded' />
              </div>
              <div className='flex-grow ml-4'>
                <h2 className='text-lg font-semibold'>{producto.titulo}</h2>
                <p className='text-gray-500'>{producto.descripcion}</p>
              </div>
              <div className='flex-shrink-0'>
                <div className='flex items-center'>
                  <button className='bg-blue-500 px-2 py-1 rounded-l'
                   onClick={() => productoRepetido(producto._id)} 
                  >
                    -
                  </button>
                  <input
                    type='number'
                    className='w-12 text-center border-t border-b border-gray-300'
                    
                    onChange={() => productoRepetido(producto._id)} 
                  />
                  <button className='bg-blue-500 px-2 py-1 rounded-r'
                 onClick={() => productoRepetido(producto._id)} 
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='flex-shrink-0 ml-4'>
                <p className='text-lg font-semibold'>${producto.precioVenta}</p>
              </div>
              <div className='flex-shrink-0 ml-4'>
                <button className='text-red-500 hover:underline' 
                onClick={() => handleEliminarProducto(producto._id)}
                >Eliminar</button>
              </div>
              <div className='mt-4'>
            <p className='text-lg font-semibold'>Importe Total: ${producto.precioVenta * producto.cantidad}</p>
          </div>
            </div>
          ))}</div> 
        )}
        
      </div>
    </div>
  );
};

export default Carrito;