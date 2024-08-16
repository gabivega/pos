import React , { useRef, useState, useEffect} from 'react'
//import { BsCloudUpload , BsFillTrashFill} from 'react-icons/bs'
import { useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import Spinner from "../components/Spinner";
import { useDispatch } from 'react-redux';
import { setProveedores } from '../state/state';
import { setCategories } from '../state/state';
import ExcelReader from "../components/excelReader";

const NuevoProducto = () => {
  //const [uploadedImage, setUploadedImage] = useState(null)
  //const [imageUrl, setImageUrl] = useState({})
  const [isNuevaCategoria, setIsNuevaCategoria] = useState(false)
  const [showModal, setShowModal]= useState(false)
  const [precioSugerido, setPrecioSugerido] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleOnStore, setIsVisibleOnStore] = useState("falso")
  const [dolarBlueValue, setDolarBlueValue] = useState(null);
  const [costoUsd, setCostoUsd] = useState(0)
  const formRef = useRef(null)
  const user = useSelector (state => state.user)
  const categorias = useSelector(state => state.categories)
  const proveedores = useSelector(state => state.proveedores)
  const dispatch = useDispatch()

  const baseUrl = process.env.REACT_APP_BASEURL

// OBTENER PRECIO DOLAR BLUE

const fetchDolarBlueValue = async () => {
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const data = await response.json();

    // Obtén el valor de venta del dólar blue
    const blueValueSell = data.blue.value_sell;

    // Actualiza el estado con el valor del dólar blue
    setDolarBlueValue(blueValueSell);
    console.log(dolarBlueValue);
  } catch (error) {
    console.error('Error al obtener el valor del dólar blue', error);
  }
  
};

// SOW CONFIRMATION MODAL
const showConfirmationModal = (e) => {
  e.preventDefault()
  console.log(dolarBlueValue);
  setShowModal(true)
}
// OBTENER PROVEEDORES
  const getProveedores = async () => {
  const req = await fetch(`${baseUrl}/getProveedores`, {
    method: "GET",
    headers: {"content-type":"application/JSON"}})
    const proveedores = await req.json()
    dispatch(setProveedores({proveedores}))
//    console.log(proveedores);   
  }
  const getCategorías = async () => {
  const req = await fetch(`${baseUrl}/obtenerCategorias`, {
    method: "GET",
    headers: {"content-type":"application/JSON"}})
    const categorias = await req.json()
   dispatch(setCategories({categorias}))
   console.log(categorias);   
  }

  // CONVERT IMAGE TO BASE 64
  // const uploadImage = (e) => {
  //     const files = e.target.files
  //     const reader = new FileReader()
  //     reader.onload = () => {     
  //       setUploadedImage(reader.result)
  //     }
  //     reader.readAsDataURL(files[0])      
  //   }

    // UPLOAD IMAGE TO CLOUDINARY FUNCTION
    // const cloudinaryUpload = async ()=>{
    //   let cloudinaryFormData = new FormData();
    //   cloudinaryFormData.append("file", uploadedImage)
    //   cloudinaryFormData.append("upload_preset","jmxyjty3")
    //   cloudinaryFormData.append("cloud_name","emprenet")
    //   try {
    //     const upload = await fetch("https://api.cloudinary.com/v1_1/emprenet/image/upload",
    //     {method: "POST",
    //     body:cloudinaryFormData})        
    //     const cloudinaryResponse = await upload.json()
    //     return cloudinaryResponse.secure_url
              
    //   } 
    //   catch (error) {
    //     console.log({error: error.message});
    //   }          
    // }
// SUBMIT FORM FUNCTION
    const submitProduct = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      //const imageUrl = await cloudinaryUpload()
      // FORMDATA OBJECT
      const formData = {
        "categoria": formRef.current.categoria.value,
        "titulo" : formRef.current.titulo.value,
        "marca" : formRef.current.marca.value,
        "precioCosto": formRef.current.precioCosto.value,
        "precioCostoUsd": formRef.current.precioCostoUsd.value,
        "precioVenta": formRef.current.precioVenta.value,
        // "margen": formRef.current.margen.value,
        "stock": formRef.current.stock.value,
       // "imagen": imageUrl,
        "descripcion": formRef.current.descripcion.value,
        "codigo": formRef.current.codigo.value,
        "proveedor" : formRef.current.proveedor.value,
        "visibleEnTienda" : isVisibleOnStore
        }
        console.log(formData);
        console.log(dolarBlueValue);  
        setShowModal(true)

        // const clearFormData = (object) => {
        //   Object.values(object).forEach(key => {
        //     object[key] = ""
        //   })
        // }
        // const resetForm = (form) => {
        //   Object.values(form.current)
        // }
        const createPost = await fetch(`${baseUrl}/newProduct`, {
        method : "POST",
        headers: {"content-type":"application/JSON"},
        body: JSON.stringify(formData)})   
        const newProduct = await createPost.json()
        formRef.current.reset()
      //  setUploadedImage(null)
        setIsLoading(false)
        setShowModal(false)
  }                
    
    //DELETE IMAGE FUNCTION
    // const deleteImage = () => {
    //   setUploadedImage(null)
    // }

    //CALCULADOR PRECIO VENTA
    const calculadorPrecioVenta = () => {
      let costo = Number(formRef.current.precioCosto.value);
      // let margen = Number(formRef.current.margen.value);
      // setPrecioSugerido(costo + costo*(margen/100))
      calculadorUsd()
    }
    //CALCULADOR PRECIO COSTO EN USD
    const calculadorUsd = () => {
      let costo = Number(formRef.current.precioCosto.value);
      let costoUsd = (costo / dolarBlueValue)
      setCostoUsd(costoUsd.toFixed(2))
    }

    // funcion para seleccionar visibilidad del producto en la tienda
    // const visibleEnTienda = () => {
    //   if (isVisibleOnStore === "falso") {
    //     setIsVisibleOnStore("verdadero")
    //   } 
    //   else setIsVisibleOnStore("falso")
    // }

    useEffect(() => {
      getProveedores();
      getCategorías();
      fetchDolarBlueValue();
    }, [])
    

  return (
    <div className='flex justify-between items-center min-h-screen flex-col flex-grow position-relative'>
            {/* MODAL CONFIRMACION */}
      {showModal && 
        <div className="bg-black inset-0 fixed bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full">
          <div className="bg-slate-400 p-6 text-white text-lg flex justify-center flex-col fixed rounded-md z-20">
            <h1>CONFIRMAR PRODUCTO</h1>
              <span className='bg-slate-500 p-1 rounded-md my-1 flex'>
                <p className='text-transform: capitalize text-gray-100 text-xl'>Titulo: </p>
                <p className='text-transform: capitalize'>{formRef.current.titulo.value || ""}</p>
              </span>
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p className='text-transform: capitalize'>Marca: {formRef.current.marca.value || ""}</p>
              </span>
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Precio de Costo: {formRef.current.precioCosto.value || ""}</p>
              </span>
              {/* <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Margen: {formRef.current.margen.value || ""}</p>
                </span> */}
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Precio de venta: {formRef.current.precioVenta.value || ""}</p>
              </span>
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Descripcion: {formRef.current.descripcion.value || ""}</p>
              </span>
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Codigo: {formRef.current.codigo.value || ""}</p>
              </span>
              <span className='bg-slate-500 p-1 rounded-md my-1'>
                <p>Visible en Tienda: {isVisibleOnStore}</p>
              </span>
              <div className='flex justify-center items-center mt-4'>
                {isLoading ? <Spinner/> :<>
                <button 
                  className='bg-red-500 rounded-sm py-2 px-6 text-white font-bold m-5'
                  onClick={()=>setShowModal(false)}>
                    Cancelar</button>
                <button 
                  className='bg-cyan-500 rounded-sm py-2 px-6 text-white font-bold m-5'
                  onClick={submitProduct}>Guardar</button></>}
              </div>
            </div>
        </div>}
      {user? 
        <form 
          className='bg-slate-500 w-[500px] mx-auto my-5 p-2 rounded flex-grow m'
          ref={formRef}>
            <div className='flex justify-center mt-2'>
                <h1 className='text-white text-2xl font-semibold m-auto '>CREAR PRODUCTO</h1>
            </div>
              {/* TITULO */}
            <div className='flex flex-col gap-1 m-2 border-b-2 border-gray-400 p-1'>
                <span className='text-white basis-1/4'>Titulo</span>
                <input 
                    type="text" 
                    className='rounded p-1'
                    name='titulo'
                    maxLength={40}
                    required="true" />
            </div>            
            {/* CATEGORIA - MARCA*/}
            <div className='flex flex-row'>
            <div className='flex flex-col gap-1 m-2 border-b-2 border-gray-400 p-1'>
                <span className='text-white basis-1/4'>Categoría</span>
                <select 
                  name="categoria"                   
                  className='rounded p-1'
                  >
                    {/* MAP POR ARRAY CATEGORIAS */}
                    {categorias.map((categoria) =>
                    <option>{categoria.nombreCategoria}</option>)}

                    {/* AGREGAR COMPONENTE PARA GUARDAR CATEGORIA */}
                    <option onClick={() => setIsNuevaCategoria(true)}>Agregar nueva categoría...</option>
                </select>
            </div>
            <div className='flex flex-col gap-1 m-2 border-b-2 border-gray-400 p-1'>
                <span className='text-white basis-1/4'>Marca</span>
                <input 
                    type="text" 
                    className='rounded p-1'
                    name='marca'
                    maxLength={30} />
            </div>
            </div>
            
            <div className='flex flex-row gap-2 m-2 border-b-2 border-gray-400 p-1 justify-between'>
              <div className='flex flex-col'>            
                <span className='text-white basis-1/4'>Precio de Costo</span>
                <input 
                  type="text" 
                  className='w-20 rounded p-1'
                  maxLength={10}
                  name='precioCosto'
                  onChange={calculadorPrecioVenta}                                
                   />
                   <span className='text-white basis-1/4'>Precio de Costo USD</span>
                   <input 
                    type="text" 
                    value={costoUsd}
                    className='w-20 rounded p-1'
                    name='precioCostoUsd'
                    maxLength={10}/>
                </div>
              {/* <div className='flex flex-col'>            
                <span className='text-white basis-1/4'>Margen</span>
                <input 
                  type="text" 
                  className='w-20 rounded p-1'
                  maxLength={4}
                  name='margen'
                  id="margen"
                  value={categorias[0].margen}
                   />
                </div> */}
              <div className='flex flex-col'>
                <span className='text-white basis-1/4'>Precio de Venta</span>
                <input 
                    type="text" 
                    placeholder={precioSugerido}
                    className='w-20 rounded p-1'
                    name='precioVenta'
                    maxLength={10}/>
              </div>
                <div className='flex flex-col'>
                <span className='text-white basis-1/4'>Stock</span>
                <input 
                  type="text" 
                  className='w-20 rounded p-1'
                  maxLength={5}
                  name='stock' />
                </div>
            </div>           
            {/* <div className='bg-slate-200  h-44 m-2 rounded flex justify-center items-center hover:cursor-pointer pt-4'>              
                {!uploadedImage ?
                <label htmlFor="image" className='w-full h-full flex items-center justify-center hover:cursor-pointer'> 
                  <span className='flex gap-2  text-xl '>
                 Click Aquí para cargar imagen 
                <BsCloudUpload />
                <input 
                  type="file" 
                  onChange={uploadImage} 
                  className='hidden' 
                  id='image'
                  accept='image/*'
                  multiple="multiple"
                 />
               </span> </label>: 
              <div className='flex justify-center itms-center flex-col p-2 gap-1'>
                <div className='flex overflow-hidden'>
                <img src={uploadedImage }alt="" className='w-full h-32 object-cover rounded'/>
                </div>                
                <BsFillTrashFill  
                  className='text-blue text-xl mx-auto z-1'
                  onClick={deleteImage}/>
              </div> }                                
            </div> */}
            
            <div className='flex-col gap-2 m-2 border-b-2 border-gray-400 p-1 hidden'>
                <span className='text-white basis-1/4 '>Descripción</span>
                <textarea 
                    type="text" 
                    className='w-[100%] h-20 rounded p-1'
                    name='descripcion'
                    maxLength={300}
                    rows={4} />
            </div>
            <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-2 m-2 border-b-2 border-gray-400 p-1'>
                <span className='text-white basis-1/4'>Proveedor</span>
                <select 
                  name="proveedor"                   
                  className='rounded p-1'
                  >
                    {/* MAP POR ARRAY CATEGORIAS */}
                    {proveedores && proveedores.map((proveedor) =>
                    <option>{proveedor.proveedor}</option>)}

                    {/* AGREGAR COMPONENTE PARA GUARDAR CATEGORIA */}
                    {/* <option onClick={() => setIsNuevaCategoria(true)}>Agregar nueva categoría...</option> */}
                </select>
            </div>
            <div className='flex flex-col gap-2 m-2 border-b-2 border-gray-400 p-1'>
                <span className='text-white basis-1/4'>Código</span>
                <input 
                  type="text"
                  className='rounded p-1'
                  name='codigo' />
            </div>
            </div>
            {/* <div className='gap-1 m-2 border-b-2 border-gray-400 p-1 hidden'>
              <span className='text-white select-none'>
                Visible en Tienda:
              </span>
                <input type="checkbox" className='p-1 w-4' name='visibleEnTienda' onClick={() => visibleEnTienda()}/>
            </div> */}
            <div className='flex justify-center'> 
              <button 
              className='bg-red-600 rounded p-2 border-green-500 text-white my-1'
              onClick={showConfirmationModal}
              >Guardar</button>                         
            </div>
            <h4>Carga Masiva:</h4>
            <ExcelReader />   
        </form> : 
          <>
          <div className='bg-slate-400 h-20 mx-auto flex flex-col justify-center 
          items-center mt-10 rounded p-5'>
            <h2 className=' text-white text-semibold text-xl'>REQUIERE ESTAR LOGEADO PARA CREAR PRODUCTOS</h2>
            <Link to="/login" className='text-blue '>Iniciar Sesión</Link>
            </div></> } 
                 
    </div>
  )
}

export default NuevoProducto