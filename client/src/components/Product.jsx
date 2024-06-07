import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setCurrentProduct } from '../state/state'
import { addToCart } from '../state/state'

const Product = (productos) => {
  const producto = productos.producto
//  console.log(productos);
  const imagen = producto.imagen
  const id = producto._id
 // console.log(id);
  // CAPITALIZE FIRST LETTER OF TITLE
  const titulo = producto.titulo
  const tituloToLowerCase = producto.titulo.toLowerCase()
  const tituloFirstLetter = titulo[0].toUpperCase()
  const tituloSpliced = tituloToLowerCase.slice(1)
  const tituloCapitalized = tituloFirstLetter + tituloSpliced
  const precioVenta = producto.precioVenta
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isProductInCart, setIsProductInCart] = React.useState(false)
  const showPopup = (message) => {
    alert(message)
  }
  // Abrir producto en nueva ventana al clickearlo:
  const abrirProducto = (e) =>{
    dispatch(setCurrentProduct({producto}))
    navigate(`/producto/${id}`)
  }
  const cart = useSelector(state => state.cart)
  // actualizar carrito 
  const agregarCarrito = () => {    
    dispatch(addToCart({producto}))
    console.log(producto);
    console.log(cart);
  }
  const addToCartValidation = () => {
    const productoExiste = cart.find((p) => p._id === producto._id);
    if (productoExiste) {
      setIsProductInCart(true)
      const message = "el Producto ya se Encuentra en el Carrito"
      showPopup(message)
      return
    }
    else {
      setIsProductInCart(false)
      const message = "Producto Agregado al Carrito"
      showPopup(message)
      dispatch(addToCart({producto}))
    }
  }
  const handleAgregarCarrito = (e) => {
    e.stopPropagation()
    addToCartValidation()
    agregarCarrito()
  }

  return (
    <div className='border-gray-400 flex flex-col border-[1px] rounded h-[300px] w-[200px] flex-shrink-0 p-2  hover:cursor-pointer'
      onClick={abrirProducto}
      id={id}>
        <div className='flex p-1 justify-center items-center basis-[60%] border-b-[1px] border-gray-400' >
         <img src={imagen} alt="" className='object-contain w-[160px] h-[160px] ' />
        </div>
        <div className='flex flex-col gap-1/2 mt-1 basis-[40%] '>
          <h2 className='text-grey-800 font-semibold basis-[30%]'>$ {precioVenta}</h2>
          <h3 className='text-overflow:hidden'>{tituloCapitalized}</h3>          
        </div>
        <div className='flex justify-center'>
        <button className='bg-blue rounded px-2 py-1 mx-auto text-sm text-white font-semibold w-[100%]'
        onClick={handleAgregarCarrito}>AGREGAR AL CARRITO</button>
        </div>
        
    </div>
  )
}

export default Product