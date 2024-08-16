import React, {useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { setVisibleProducts } from '../state/state'
// import { setCategories } from '../state/state'
// // import Product from '../components/Product'
// import ProductsSlider from '../components/ProductsSlider'
// import InfoSection from '../components/InfoSection'
// import MiddleSectionSlider from '../components/MiddleSectionSlider'
// import UpperSectionSlider from '../components/UpperSectionSlider'
// import CategoriasPopulares from '../components/CategoriasPopulares'
import DashboardBar from '../components/DashboardBar'
import { Outlet } from 'react-router-dom'
import Login from './login'
const HomePage = () => {
const user = useSelector(state => state.user)

  return (
        <div  class="flex w-full h-full justify-center">
          {user ?
        <>
          <div className='flex justify-between w-full h-full'>
              <DashboardBar className="min-w-full"/>
            <div className='flex justify-center w-full h-full bg-slate-300'>  
              <Outlet className="w-full h-full flex-grow" />        
            </div>          
          </div>  
        </> 
      : 
      <div><Login /></div>
      }
    </div>

  )
}

export default HomePage