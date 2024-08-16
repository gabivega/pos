import React, { useState,useRef, useEffect, } from 'react'
import Spinner from './Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { setCategories } from '../state/state'

const ActualizarPrecios = () => {

  const categoriaRef = useRef(null)
  const proveedorRef = useRef(null)
  const variacionCategoriaRef = useRef(null)
  const variacionProveedorRef = useRef(null)
  //const categorias = useSelector(state => state.categories)
  const [proveedores, setProveedores] = useState([])
  const [categorias, setCategorias] = useState([])
  const [filtro, setFiltro] = useState("");
  const dispatch= useDispatch()
  const baseUrl = process.env.REACT_APP_BASEURL

  const getProveedores = async () => {
    const req = await fetch(`${baseUrl}/getProveedores`, {
      method: "GET",
      headers: {"content-type":"application/JSON"}})
      const res = await req.json()
      setProveedores(res)   
    }
    const getCategorías = async () => {
      const req = await fetch(`${baseUrl}/obtenerCategorias`, {
        method: "GET",
        headers: {"content-type":"application/JSON"}})
        const categorias = await req.json()
       dispatch(setCategories({categorias}))
       setCategorias(categorias)
       console.log(categorias);   
      }

  const actualizarPorCategoria = async (e) => {
    e.preventDefault();
    const formData = {
      "categoria": categoriaRef.current.value,
      "variacion": parseFloat(variacionCategoriaRef.current.value)
    }
    console.log(formData);
    const actualizacion = await fetch(`${baseUrl}/actualizarPorCategoria`, {
      method: "PATCH",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(formData)
    })
    console.log(actualizacion)
  }
  const actualizarPorProveedor = async (e) => {
    e.preventDefault();
    const formData = {
      "proveedor": proveedorRef.current.value,
      "variacion": parseFloat(variacionProveedorRef.current.value)
    }
    console.log(formData);
    const actualizacion = await fetch(`${baseUrl}/actualizarPorProveedor`, {
      method: "PATCH",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(formData)
    })
    console.log(actualizacion)
  }
  useEffect(() => {
   getProveedores()
   getCategorías()
  }, [])
  

  return (
    <div className='flex flex-col rounded bg-slate-300 p-4 gap-2 w-1/2'>
      <h1 className='text-blue font-semibold my-2 text-center'>Actualizar Precios</h1>
      <form action=""className="flex flex-col border-slate-700 border-[1px] p-4 rounded justify-center w-full gap-4">
        <div className='border-[1px] border-black'>
          <h3 className='font-bold'>Por Categoría</h3>
          <div className='flex gap-2 my-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Nombre</h4>
          <select  
          className='border-blue border-2 rounded'
          name="nombreCategoria"
          ref={categoriaRef}          
          > <option >Elija una categoria..</option>
            {categorias.map((categoria) =>
              <option key={categoria._id}>{categoria.nombreCategoria}</option>
            )}
          </select>             
        </div>
        <div className='flex gap-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Porcentaje</h4>
          <input 
            type="number" 
            className='border-blue border-2 rounded w-20 px-2'
            maxLength={4}
            name='variacionCategoria'  
            ref={variacionCategoriaRef}       
             /><span>%</span>
             <button 
          className='rounded text-white font-semibold p-2 text-sm bg-blue my-2 mx-auto'
          onClick={actualizarPorCategoria}
          disabled={""}>Confirmar</button>       
        </div>
        </div>
        {/* <div className='border-[1px] border-black'>
          <h3>Por Marca</h3>
          <div className='flex gap-2 my-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Nombre</h4>
          <select  
          className='border-blue border-2 rounded'
          name="nombreCategoria"
          ref={categoriaRef}          
          > <option >Elija una categoria..</option>
            {categorias.map((categoria) =>
              <option key={categoria._id}>{categoria.nombreCategoria}</option>
            )}
          </select>             
        </div>
        <div className='flex gap-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Porcentaje</h4>
          <input 
            type="number" 
            className='border-blue border-2 rounded w-20 px-2'
            maxLength={4}
            name='margenCategoria'  
            ref={variacionRef}       
             /><span>%</span>
             <button 
          className='rounded text-white font-semibold p-2 text-sm bg-blue my-2 mx-auto'
          onClick={actualizarPorCategoria}
          disabled={""}>Confirmar Aumento</button>       
        </div>
        </div> */}
        <div className='border-[1px] border-black'>
          <h3 className='font-bold'>Por Proveedor</h3>
          <div className='flex gap-2 my-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Nombre</h4>
          <select  
          className='border-blue border-2 rounded'
          name="nombreProveedor"
          ref={proveedorRef}          
          > <option >Elija un Proveedor..</option>
            {proveedores.map((proveedor) =>
              <option key={proveedor._id}>{proveedor.proveedor}</option>
            )}
          </select>             
        </div>
        <div className='flex gap-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Porcentaje</h4>
          <input 
            type="number" 
            className='border-blue border-2 rounded w-20 px-2'
            maxLength={4}
            name='variacionProveedor'  
            ref={variacionProveedorRef}       
             /><span>%</span>
             <button 
          className='rounded text-white font-semibold p-2 text-sm bg-blue my-2 mx-auto'
          onClick={actualizarPorProveedor}
          disabled={""}>Confirmar</button>       
        </div>
        </div>
      </form>
    </div>
  )
}

export default ActualizarPrecios