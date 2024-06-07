import React from 'react'

const UserDataTable = (props) => {
    const user = props.user
    const editFunction = props.funcion

    //  DATE FORMAT
  const slicedRawDate = user.createdAt.slice(0,10)
  const splittedRawDate = slicedRawDate.split("-")
  const date = splittedRawDate[2] + "-" + splittedRawDate[1] + "-" + splittedRawDate[0] 

  
  return (
    <div>
    <div className='flex flex-col items-center gap-4 mt-6 mb-4'>
      <h1 className='text-2xl font-semibold text-blue'>Mi Cuenta</h1>
      <div className='bg-slate-300 rounded-md flex flex-col gap-3 p-5 w-[40%]'>
        <h2 className='text-xl font font-semibold text-blue'>Datos de cuenta</h2>
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
        <div className='flex flex-row  border-b border-slate-400 w-[100%]'>
          <div className='basis-1/3'>
          <h2 className='text-l font-regular '>Nombre:</h2>
        </div>            
          <div className='flex flex-row basis-2/3 justify-between w-[100%]'> 
              <p>{user.nombre || "Ingrese Nombre"}</p>
          </div>
        </div>
        {/* APELLIDO  */}
        <div className='flex flex-row  border-b border-slate-400 w-[100%]'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Apellido:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <p>{user.apellido || "Ingrese Apellido"}</p>
          </div>
        </div>
        {/* TELEFONO */}
        <div className='flex flex-row  border-b border-slate-400'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Teléfono:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <p>{user.telefono || "Ingrese Teléfono"}</p>
          </div>
        </div>     
        <h2 className='text-xl font font-semibold text-blue'>Dirección</h2> 
        {/* CIUDAD */}
        <div className='flex flex-row  border-b border-slate-400'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Ciudad:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between'>
          <p>{user.ciudad || "Ingrese Ciudad"}</p>   
          </div>
        </div>         
        {/* DIRECCION */}
        <div className='flex flex-row  border-b border-slate-500'>
          <div className='basis-1/3'><h2 className='text-l font-regular '>Direccion:</h2></div>            
          <div className='flex flex-row basis-2/3 justify-between w-[100%]'>
          {user.direccion || "ingrese Dirección"}            
          </div>
        </div> 
        <button 
          className="rounded bg-blue w-[20%] p-1 hover:cursor-pointer 
          mx-auto my-2  text-white font-semibold"
          onClick={editFunction }>
      Editar          
    </button>                              
      </div>
    </div>
  </div>
  )
}

export default UserDataTable