import React, { useState, useRef, useEffect } from 'react'
import { FaSearch} from "react-icons/fa";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../state/state';

const SearchBar = () => {

  const products = useSelector(state => state.visibleProducts)
  const [search, setSearch] = useState("")
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [showMenuBusqueda, setShowMenuBusqueda] = useState(false)
  const menuBusquedaRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenus);
    // return () => {
    //   document.removeEventListener("click", handleClickOutsideMenus);
    // };
  }, []);

  const handleClickOutsideMenus = (e) => {
    if (!menuBusquedaRef?.current?.contains(e.target)) {
      setShowMenuBusqueda(false);
      setSearch(false)
    }
  };

  const busqueda = (e) => {
    setShowMenuBusqueda(true)
    setSearch(e.target.value)
    const productosBuscados = products.filter((producto) => producto.titulo.toLowerCase().includes(search.toString().toLowerCase()) | producto.marca.toLowerCase().includes(search.toString().toLowerCase()) )
    setProductosFiltrados(productosBuscados)
  }

const abrirProducto = (p) => {
  setShowMenuBusqueda(false);
  setSearch(false)
  console.log(p._id);
  const producto = p
  dispatch(setCurrentProduct({producto}))
  navigate(`/producto/${p._id}`)
}


  return (
    <div className='flex flex-col w-full h-full'> 
      <div className="flex ">
          <input
          type="text"
          placeholder={"¿Qué estás buscando?"}
          className="w-[100%] h-[40px] rounded-l-lg p-2 outline-0"
          onChange={busqueda}
          />
        <div className=" bg-white h-[40px] rounded-r-lg flex items-center p-2">
          <FaSearch className="text-gray-300" />
        </div>
      </div>
      {showMenuBusqueda && productosFiltrados.length > 0 && (
      <div ref={menuBusquedaRef} className='flex w-1/2 bg-slate-100 h-50 z-10 rounded-md y-10 mt-12 h-50 p-2 absolute'>
        <div  className='flex w-full z-10 flex-col'>
          {productosFiltrados.map((producto, i) => (
            <div
            onClick={() => abrirProducto(producto)} 
            key={i}  
            className='block z-10 text-lg h-10 w-full cursor-pointer select-none hover:bg-slate-300 rounded-md p-2'><p className='block'>{producto.titulo} {producto.marca}</p></div>     
          ))}
          </div></div>)}
    </div>
  )
}

export default SearchBar