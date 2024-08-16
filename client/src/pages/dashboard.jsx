import React from 'react'
import { useSelector } from 'react-redux'
import DashboardBar from '../components/DashboardBar'
import { Outlet, Link } from 'react-router-dom'
import Login from './login'
const Dashboard = () => {

  const user = useSelector(state => state.user)

  return (
    <div  class="flex w-full justify-center">
       {user ?
       <>
      <div className='flex justify-between w-full h-full'>
      <DashboardBar className="min-w-full min-h-full"/>
      <div className='flex justify-center w-full bg-slate-300'>  
        <Outlet />        
      </div>
      </div>  </> 
      : 
      <Login className="min-w-full min-h-full"/>
      // <div className='text-red-600 text-xl font-bold text-center w-full'>ACCESO NO AUTORIZADO<br/> <Link to={"/login"}>INICIAR SESIÓN</Link></div>
      }
    </div>
  )
}

export default Dashboard