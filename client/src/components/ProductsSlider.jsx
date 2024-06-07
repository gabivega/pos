import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Product from '../components/Product'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

const ProductsSlider = () => {

const products = useSelector(state => state.visibleProducts)
const productsArray = products ? [...products] : []
productsArray.reverse()

// PRODUCTS SLIDES FUNCTIONS
const slideProductsLeft = () => {
  var slider = document.getElementById('slider')
  slider.scrollLeft = slider.scrollLeft -500
}

const slideProductsRight = () => {
  var slider = document.getElementById('slider')
  slider.scrollLeft = slider.scrollLeft + 500
}
  return (         
      <div className='relative flex items-center mt-2'>
          <MdChevronLeft 
          size={40} 
          className='cursor-pointer opacity-50 hover:opacity-100'
          onClick={slideProductsLeft}/>
        <div id="slider" className='w-full h-full overflow-x-scroll scroll  scroll-smooth flex gap-4 scrollbar-hide'>
         {productsArray.map((producto) => {
          return (
          <Product
            key={producto._id}
            producto={producto} 
            // titulo= {producto.titulo}
            // imagen={producto.imagen}
            // precioVenta = {producto.precioVenta}
            // id={producto._id}
            // categoria={producto.categoria}
            // descripcion={producto.descripcion}
            // marca={producto.marca}
          />)
          })}
        </div>
        <MdChevronRight 
          size={40}
          className='cursor-pointer opacity-50 hover:opacity-100'
          onClick={slideProductsRight} />
      </div>
  )
}

export default ProductsSlider