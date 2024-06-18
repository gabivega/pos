import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../state/state'

const EditUserForm = (props) => {

    const user= props.user      
    const formRef = useRef(null)
    const editFunction = props.funcion
    const dispatch = useDispatch()

    const baseUrl = process.env.REACT_APP_BASEURL
    
        //  DATE FORMAT
  const slicedRawDate = user.createdAt.slice(0,10)
  const splittedRawDate = slicedRawDate.split("-")
  const date = splittedRawDate[2] + "-" + splittedRawDate[1] + "-" + splittedRawDate[0] 


   const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {      
      "id" : user._id,
      "email" : user.email,
      "nombre" : formRef.current.nombre.value,
      "apellido": formRef.current.apellido.value,
      "telefono": formRef.current.telefono.value,
      "ciudad" : formRef.current.ciudad.value,
      "direccion": formRef.current.direccion.value
    }
    console.log(formData);
    
    const editUser = await fetch(`${baseUrl}/edituser`, {
    method : "PUT",
    headers: {
      "content-type":"application/JSON"},
      body: JSON.stringify(formData)
  })   
    const updatedUser = await editUser.json()
    console.log(updatedUser);
    dispatch(
      setLogin({ user : updatedUser})
    )
    editFunction()    
   }


  return (
    <div>
    <div className='flex flex-col items-center gap-4 mt-6 mb-10'>
      <h1 className='text-2xl font-semibold text-blue'>Mi Cuenta</h1>
      <form 
        className='bg-slate-300 rounded-md flex flex-col gap-3 p-5 w-[40%]'
        ref={formRef}>
        <h2 className='text-xl font font-semibold text-blue'>Editar Cuenta</h2>
        <div className='flex flex-row items-start border-b border-slate-400 w-[100%]'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Email:</h2></div>            
          <div className='basis-2/3 flex flex-row justify-between w-[100%]'>
            <p>{user.email}</p>                                    
        </div>
        </div>
        <div className='flex flex-row items-start border-b border-slate-400 w-[100%]'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Usuario desde:</h2></div>            
          <div className='basis-2/3 flex flex-row justify-between w-[100%]'>
            <p>{date}</p>                                    
        </div>
        </div>
        {/* NOMBRE */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%] pb-1'>
          <div className='basis-1/3'>
          <h2 className='text-l font-regular '>Nombre:</h2>
        </div>            
          <div className='flex flex-row basis-2/3 justify-between w-[100%]'>
            <input 
                type="text"
                placeholder={user.nombre || "Ingrese Su Nombre" }
                name="nombre"
                defaultValue={user.nombre}            
                // value= {}           
                 />              
          </div>
        </div>
        {/* APELLIDO  */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%] pb-1'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Apellido:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <input 
                type="text"
                placeholder={!user.apellido && "Ingrese Su Apellido"}
                name="apellido"
                defaultValue={user.apellido}  
                 /> 
          </div>
        </div>
        {/* TELEFONO */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%] pb-1'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Teléfono:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <input 
                type="text"
                placeholder={!user.telefono && "Ingrese Su Telefono" }
                name="telefono"
                defaultValue={user.telefono}  
                 /> 
          </div>
        </div>     
        <h2 className='text-xl font font-semibold text-blue'>Dirección</h2> 
        {/* CIUDAD */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%] pb-1'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Ciudad:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <input 
                type="text"
                placeholder={!user.ciudad && "Ingrese Su Ciudad"}
                name="ciudad"
                defaultValue={user.ciudad}  
                 />    
          </div>
        </div>         
        {/* DIRECCION */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%] pb-1'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Direccion:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between w-[100%]'>
          <input 
                type="text"
                placeholder={!user.direccion && "Ingrese Su Direccion" }
                name="direccion"
                defaultValue={user.direccion}  
                 />            
          </div>
        </div>               
          <button 
              className="rounded bg-blue w-[100px] p-1 hover:cursor-pointer mx-auto my-2
            text-white font-semibold"
              onClick={handleSubmit}>
              Actualizar          
           </button>                          
      </form>
    </div>
  </div>
  )
}

export default EditUserForm