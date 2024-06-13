import React from 'react'
import CategoriasPanel from '../components/CategoriasPanel'
import { useSelector } from 'react-redux'
import ProductsList from '../components/ProductsList'
import ActualizarPrecios from "../components/ActualizarPrecios"
import ProveedoresPanel from '../components/ProveedoresPanel'
import DashboardBar from '../components/DashboardBar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {

  const user = useSelector(state => state.user)

  return (
    <div  class="flex w-full">
       {user ?
       <>
      <div className='flex justify-between w-full h-full'>
      <DashboardBar className="min-w-full min-h-full"/>
      <div className='flex justify-center w-full bg-slate-300'>  
        <Outlet />        
      </div>
      {/* <div class="flex items-center justify-center w-full mx-auto"><CategoriasPanel /></div>
      <div class="flex items-center justify-center w-full mx-auto"><ProveedoresPanel /></div>
      <div class="flex items-center justify-center w-full mx-auto"><ActualizarPrecios /></div>
      <div><ProductsList />
      </div> */}
      </div>  </> 
      : 
      <div className='text-red-600 text-xl font-bold text-center w-full'>ACCESO NO AUTORIZADO<br/> INICIE SESIÓN</div>}
    </div>
  )
}

export default Dashboard