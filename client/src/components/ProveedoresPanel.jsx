import React, { useRef, useState, useEffect } from 'react'
import Spinner from './Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setProveedores } from '../state/state'

const ProveedoresPanel = () => {

  const proveedorRef = useRef(null)
  const [isLoading, setIsLoading] = useState(null)
  const dispatch= useDispatch()
  const proveedores = useSelector(state => state.proveedores)
  const eliminarProveedorRef = useRef(null)
  const [updatedProveedores, setUpdatedProveedores] = useState(proveedores)

// OBTENER PROVEEDORES
  const getProveedores = async () => {
  const req = await fetch("http://localhost:3001/getProveedores", {
    method: "GET",
    headers: {"content-type":"application/JSON"}})
    const proveedores = await req.json()
    setUpdatedProveedores(proveedores)   
  }

// guardar proveedor
  const guardarProveedor = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  const proveedor = proveedorRef.current.value;
  const data = {proveedor : proveedor}
  const save = await fetch("http://localhost:3001/crearProveedor", {
    method:"POST",
    headers: {"content-type":"application/json"},
    body: JSON.stringify(data)
  })
  const proveedoresActualizados = await save.json()
  dispatch(setProveedores(proveedoresActualizados))
  setUpdatedProveedores(proveedoresActualizados)
  setIsLoading(false);
  }
  // FUNCION ELIMINAR PROVEEDOR
const eliminarProveedor = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  const proveedorEliminado = eliminarProveedorRef.current.value
  const eliminar = await fetch("http://localhost:3001/deleteProveedor", {
    method: "DELETE",
    headers: {"content-type":"application/JSON"},
    body: JSON.stringify({proveedorEliminado})
  })
  const proveedoresActualizados = await eliminar.json()
  dispatch(setProveedores(proveedoresActualizados))
  setUpdatedProveedores(proveedoresActualizados)
  setIsLoading(false)   
}

  useEffect(() => {
    getProveedores()
  }, [])

  return (
    <div className='flex flex-col rounded bg-slate-300 p-4 gap-2 w-1/2'>
         {isLoading && <div className='w-full h-full bg-white/50 z-30 absolute'><Spinner /> </div>}
      <h3 className='text-blue font-semibold my-2 text-center'>PROVEEDORES</h3>
      {/* ----- CREAR PROVEEDOR ----- */}
      <form 
        action="" className='flex  flex-col border-slate-700 border-[1px] p-4 rounded justify-center'
        >
        <h4 className='text-blue font-semibold '>Crear Proveedor:</h4>
        <div className='flex gap-2 my-2 w-full items-center justify-center'>   
          <input 
            type="text" 
            className='border-blue border-2 rounded px-1'
            name='proveedor'
            ref={proveedorRef}
            />
          <button 
          className='rounded text-white font-semibold p-2 bg-blue my-2 mx-auto'
          onClick={guardarProveedor}>Guardar</button>                
        </div>      
        {/* {isError && <div>
          <span className='text-red-800 text-xl mr-2'>Error intente Nuevamente</span>
          <button onClick={() => setIsError(false)} className="text-sm">cerrar</button>
          </div>}
        {isDuplicatedCategory && <div>
          <span className='text-red-800 text-xl mr-2'>Error Categoria ya existente</span>
          <button onClick={() => setIsDuplicatedCategory(false)} className="text-sm">cerrar</button>
          </div>}
        {savedOk && <span className='text-green-800 text-xl'>Categoría guardada correctamente!</span>}    */}
      </form>
      {/* ELIMINAR PROVEEDOR */}
      <form 
        action="" className='flex  flex-col border-slate-700 border-[1px] p-4 rounded justify-center'
        >
        <h4 className='text-blue font-semibold '>Eliminar Proveedor:</h4>
        <div className='flex gap-2 my-2 w-full items-center justify-center'>   
        <select 
                  name="proveedor"                   
                  className='rounded p-1'
                  ref={eliminarProveedorRef}
                  >
                    {/* MAP POR ARRAY PROVEEDORES */}
                    {updatedProveedores && updatedProveedores.map((proveedor) =>
                    <option>{proveedor.proveedor}</option>)}

                    {/* AGREGAR COMPONENTE PARA GUARDAR CATEGORIA */}
                    {/* <option onClick={() => setIsNuevaCategoria(true)}>Agregar nueva categoría...</option> */}
                </select>
          <button 
          className='rounded text-white font-semibold p-2 bg-red-500 my-2 mx-auto'
          onClick={eliminarProveedor}>Eliminar</button>                
        </div>      
        {/* {isError && <div>
          <span className='text-red-800 text-xl mr-2'>Error intente Nuevamente</span>
          <button onClick={() => setIsError(false)} className="text-sm">cerrar</button>
          </div>}
        {isDuplicatedCategory && <div>
          <span className='text-red-800 text-xl mr-2'>Error Categoria ya existente</span>
          <button onClick={() => setIsDuplicatedCategory(false)} className="text-sm">cerrar</button>
          </div>}
        {savedOk && <span className='text-green-800 text-xl'>Categoría guardada correctamente!</span>}    */}
      </form>
    </div>
  )
}

export default ProveedoresPanel