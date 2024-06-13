import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {BiPencil, BiCheck} from "react-icons/bi"
import EditUserForm from '../components/EditUserForm'
import UserDataTable from '../components/UserDataTable'


const MiCuenta = () => {

  const user = useSelector(state => state.user)
  const [editMode, setEditMode] = useState(false)

  const editFunction = () => {setEditMode(!editMode)}
  
  return (
    <div className='flex flex-col w-full' >
      {!editMode ? 
      <><UserDataTable user={user} funcion={editFunction}/>
      </>
       : 
        <EditUserForm user={user} funcion={editFunction} />
      }
              
    </div>
  )
}

export default MiCuenta