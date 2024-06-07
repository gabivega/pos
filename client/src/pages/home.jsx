import React, {useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleProducts } from '../state/state'
import { setCategories } from '../state/state'
// import Product from '../components/Product'
import ProductsSlider from '../components/ProductsSlider'
import InfoSection from '../components/InfoSection'
import MiddleSectionSlider from '../components/MiddleSectionSlider'
import UpperSectionSlider from '../components/UpperSectionSlider'
import CategoriasPopulares from '../components/CategoriasPopulares'
import DashboardBar from '../components/DashboardBar'
import { Outlet } from 'react-router-dom'
import Login from './login'
const HomePage = () => {
const user = useSelector(state => state.user)
// const products = useSelector(state => state.products)
// const stateCategories = useSelector(state => state.categories)
const dispatch = useDispatch()


const getVisibleProducts = async () => {
  const productsRequest = await fetch("http://localhost:3001/visibleproducts", {
    method: "GET",
    headers: {"content-type": "application/json"}
  })
  const products = await productsRequest.json()
  dispatch(setVisibleProducts({products}))  
}
const getCategories = async () => {
  const req = await fetch("http://localhost:3001/obtenercategorias", {
    method: "GET",
    headers: {"content-type":"application/JSON"}})
    const categorias = await req.json()
    dispatch(setCategories({categorias}))   
  }
  

useEffect(() => {
  getVisibleProducts()
  getCategories()  
}, [])


  return (
        <div  class="flex w-full h-full justify-center">
          {user ?
        <>
          <div className='flex justify-between w-full h-full'>
              <DashboardBar className="min-w-full"/>
            <div className='flex justify-center w-full h-full bg-slate-300'>  
              <Outlet className="w-full h-full flex-grow" />        
            </div>
                {/* <div class="flex items-center justify-center w-full mx-auto"><CategoriasPanel /></div>
                <div class="flex items-center justify-center w-full mx-auto"><ProveedoresPanel /></div>
                <div class="flex items-center justify-center w-full mx-auto"><ActualizarPrecios /></div>
                <div><ProductsList />
              </div> */}
          </div>  
        </> 
      : 
      <div><Login /></div>
      // <div className='text-red-600 text-xl font-bold text-center w-full h-full'>ACCESO NO AUTORIZADO<br/> INICIE SESIÓN</div>
      }
    </div>
    // <div className='min-h-100vh'>
    //   <UpperSectionSlider />    
    //   <InfoSection />
    //   <h3 className='font-semibold mt-12 ml-6'>Nuevos Productos</h3> 
    //   <ProductsSlider />
    //   <h3 className='font-semibold mt-12 ml-6'>Categorías Populares</h3> 
    //   <CategoriasPopulares />
    //   <h3 className='font-semibold mt-12 ml-6'>Productos Crossmaster</h3>   
    //   <MiddleSectionSlider />
    //   <h3 className='font-semibold mt-12 ml-6'>Ofertas</h3> 
    //   <ProductsSlider />

      
    // </div>
  )
}

export default HomePage