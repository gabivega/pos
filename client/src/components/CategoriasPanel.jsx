import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../state/state'
import Spinner from './Spinner'

const CategoriasPanel = () => {

const saveFormRef = useRef(null)
const editFormRef = useRef(null)
const selectRef = useRef(null)
const margenRef = useRef(null)
const categorias= useSelector(state => state.categories)
const [updatedCategories, setUpdatedCategories] = useState(categorias)
const dispatch = useDispatch()
const [isDuplicatedCategory, setIsDuplicatedCategory] = useState(false)
const [isError, setIsError] = useState(false)            
const [savedOk, setSavedOk] = useState(false)
const [isLoading, setIsLoading] = useState(false)


// FUNCION GUARDAR CATEGORIA
const saveCategory = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  const formData = {
    "nombreCategoria": saveFormRef.current.nombreCategoria.value,
    "margenCategoria": saveFormRef.current.margenCategoria.value
  }  
  const guardarCategoria = await fetch("http://localhost:3001/guardarcategoria", {
    method: "POST",
    headers: {"content-type":"application/JSON"},
    body: JSON.stringify(formData)})  
     
    if (guardarCategoria.status == 409) {
      setIsLoading(false)
      setIsDuplicatedCategory(true);
      return;
    }    
    if (!guardarCategoria.ok) {
      setIsError(true)
      setIsLoading(false)
      return}  
      console.log(guardarCategoria);
      const saveResponse =  await guardarCategoria.json()
      dispatch(setCategories(saveResponse))
      setUpdatedCategories(saveResponse)
      console.log(saveResponse);
      setSavedOk(true)
      setIsLoading(false)
      setTimeout(()=> {
        setSavedOk(false)
       saveFormRef.current.reset()   
      }, "3000")    
    }
    // FUNCION EDITAR CATEGORIA
    const editCategory = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      const formData = {
        "nombreCategoria": editFormRef.current.nombreCategoria.value,
        "margenCategoria": editFormRef.current.margenCategoria.value
      }  
      const edit = await fetch("http://localhost:3001/editarcategoria", {
        method: "PATCH",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(formData)
      })
      console.log(edit);
    }
    // FUNCION IMPRIMIR MARGEN
    const showMargen = () => {
  const categoriaSeleccionada = selectRef.current.value
  const isCategoriaSeleccionada = (element) => element.nombreCategoria == categoriaSeleccionada
  const index = (updatedCategories.findIndex(isCategoriaSeleccionada));
  const margen = updatedCategories[index].margenCategoria
  margenRef.current.value = margen
}
  
// FUNCION ELIMINAR CATEGORIA
const deleteCategory = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  const categoriaSeleccionada = editFormRef.current.nombreCategoria.value
  console.log(categoriaSeleccionada);
  if (categoriaSeleccionada === "Elija una categoria..") {
    setIsLoading(false)
    return}
    const eliminar = await fetch("http://localhost:3001/eliminarcategoria", {
    method: "DELETE",
    headers: {"content-type":"application/JSON"},
    body: JSON.stringify({categoriaSeleccionada})
  })
  const categoriasActualizadas = await eliminar.json()
  dispatch(setCategories(categoriasActualizadas))
  setUpdatedCategories(categoriasActualizadas)
  margenRef.current.value = null
  setIsLoading(false)   
}

  return (
    <div className='flex flex-col rounded bg-slate-300 p-4 gap-2 w-1/2'>
      {isLoading && <div className='w-full h-full bg-white/50 z-30 absolute'><Spinner /> </div>}
      <h3 className='text-blue font-semibold my-2 text-center'>CATEGORIAS</h3>
      {/* ----- CREAR CATEGORIA ----- */}
      <form 
        action="" className='flex  flex-col border-slate-700 border-[1px] p-4 rounded justify-center'
        ref={saveFormRef}>
        <h4 className='text-blue font-semibold '>Crear Categoria:</h4>
        <div className='flex gap-2 my-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Nombre</h4>
          <input 
            type="text" 
            className='border-blue border-2 rounded px-1'
            name='nombreCategoria'
            />           
        </div>
        <div className='flex gap-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Margen</h4>
          <input 
            type="number" 
            className='border-blue border-2 rounded w-20 px-2'
            maxLength={4}
            name='margenCategoria'
             /><span>%</span>
        </div>
        {isError && <div>
          <span className='text-red-800 text-xl mr-2'>Error intente Nuevamente</span>
          <button onClick={() => setIsError(false)} className="text-sm">cerrar</button>
          </div>}
        {isDuplicatedCategory && <div>
          <span className='text-red-800 text-xl mr-2'>Error Categoria ya existente</span>
          <button onClick={() => setIsDuplicatedCategory(false)} className="text-sm">cerrar</button>
          </div>}
        {savedOk && <span className='text-green-800 text-xl'>Categoría guardada correctamente!</span>}
        <button 
          className='rounded text-white font-semibold p-2 bg-blue my-2 mx-auto'
          onClick={saveCategory}>Guardar</button>               
      </form>

      {/* -----EDITAR CATEGORIA ------ */}
      <div className='flex gap-2'>
      <form 
        action="" className='flex  flex-col border-slate-700 border-[1px] p-4 rounded justify-center w-full'
        ref={editFormRef}>
        <h4 className='text-blue font-semibold '>Editar Categoria:</h4>
        <div className='flex gap-2 my-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Nombre</h4>
          <select  
          className='border-blue border-2 rounded'
          name="nombreCategoria"
          ref={selectRef}
          onChange={showMargen}
          > <option >Elija una categoria..</option>
            {updatedCategories.map((categoria) =>
              <option key={categoria._id}>{categoria.nombreCategoria}</option>
            )}
          </select>             
        </div>
        <div className='flex gap-2 w-full items-center'>
          <h4 className='p-2 w-[80px]'>Margen</h4>
          <input 
            type="number" 
            className='border-blue border-2 rounded w-20 px-2'
            maxLength={4}
            name='margenCategoria'
            ref={margenRef}
             /><span>%</span>
        </div>
        {isError && <div>
          <span className='text-red-800 text-xl'>Error intente Nuevamente</span>
          <button onClick={() => setIsError(false)}>x</button>
          </div>}
        {isDuplicatedCategory && <div>
          <span className='text-red-800 text-xl'>Error intente Nuevamente</span>
          <button onClick={() => setIsDuplicatedCategory(false)}>x</button>
          </div>}
        {savedOk && <span className='text-green-800 text-xl'>Categoría guardada correctamente!</span>}
        <div className='flex gap-2 justify-between'> 
        <button 
          className='rounded text-white font-semibold p-2 text-sm bg-blue my-2 mx-auto'
          onClick={editCategory}
          disabled={""}>Modificar Margen</button>               
        <button 
          className='rounded text-white font-semibold p-2  text-sm bg-red-600 my-2 mx-auto'
          onClick={deleteCategory}>Eliminar Categoría</button>
          </div>               
        </form>

      
        
      </div>
    </div>
  )
}

export default CategoriasPanel