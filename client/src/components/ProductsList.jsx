import React, { useMemo, useState, useEffect } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash } from "react-icons/fa"
import Spinner from './Spinner'
import { useDispatch } from 'react-redux'
import { setProducts } from '../state/state'

const ProductsList = () => {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editando, setEditando] = useState({})
  const [titulo, setTitulo] = useState('')
  const [marca, setMarca] = useState('')
  const [precioCosto, setPrecioCosto] = useState('')
  const [precioVenta, setPrecioVenta] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [codigo, setCodigo] = useState('')
  const [stock, setStock] = useState('')
  const [proveedor, setProveedor] = useState('')

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const productsArray = [...products]
  const [filtro, setFiltro] = useState("")
  const [addingProduct, setAddingProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [salePrice, setSalePrice] = useState('')

  const baseUrl = process.env.REACT_APP_BASEURL

  const getProducts = async () => {
    const productsRequest = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: {"content-type": "application/json"}
    })
    const products = await productsRequest.json()
    dispatch(setProducts({ products }))
  }

  const datosFiltrados = useMemo(() => {
    return products.filter(producto =>
      producto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
      producto.titulo.toLowerCase().includes(filtro.toLowerCase())
      // producto.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
  //    producto.marca.toLowerCase().includes(filtro.toLowerCase())
    )
  }, [filtro, products])

  const columns = [
    { header: "Codigo", accessorKey: "codigo" },
    { header: "Titulo", accessorKey: "titulo" },
    { header: "P.Costo", accessorKey: "precioCosto" },
    { header: "P.Venta", accessorKey: "precioVenta" },
    { header: "Marca", accessorKey: "marca" },
    { header: "Proveedor", accessorKey: "proveedor" },
    { header: "Categoría", accessorKey: "categoria" },
    { header: "Stock", accessorKey: "stock" },
    { header: "Editar", cell: (info) => (<FaEdit className='cursor-pointer' onClick={() => { editarProducto(info.row.original) }} />) },
    { header: "Eliminar", cell: (info) => (<FaTrash className='cursor-pointer' onClick={() => { eliminarProducto(info.row.original) }} />) }
  ]

  const data = useMemo(() => datosFiltrados, [filtro, products])
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  const editarProducto = (row) => {
    setShowModal(true)
    setEditando(row)
    setTitulo(row.titulo)
    setMarca(row.marca)
    setPrecioCosto(row.precioCosto)
    setPrecioVenta(row.precioVenta)
    setDescripcion(row.descripcion)
    setCodigo(row.codigo)
    setCodigo(row.codigo)
    setStock(row.stock)
    setProveedor(row.proveedor)
  }

  const eliminarProducto = async (row) => {
    setIsLoading(true)
    const id = row._id
    const res = await fetch(`${baseUrl}/deleteproduct`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify({id})
    })
    console.log(res);
    await getProducts()
    window.alert(`Producto ${row.titulo} Eliminado con exito!`)
    setIsLoading(false)
  }

  const handleSave = async () => {
    setIsLoading(true)
    const updatedFields = {
      "id": editando._id,
      titulo,
      marca,
      precioCosto,
      precioVenta,
      descripcion,
      codigo,
      proveedor, 
      stock
    };
  
    // Filtrar los campos que no se han modificado o que están vacíos
    const fieldsToUpdate = {};
    for (let key in updatedFields) {
      if (updatedFields[key] !== undefined && updatedFields[key] !== editando[key]) {
        fieldsToUpdate[key] = updatedFields[key];
      }
    }
  
    try {
      const response = await fetch(`${baseUrl}/editproduct`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldsToUpdate)
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }
  
      const result = await response.json();
      console.log(result); 
      getProducts()
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    console.log('Fetching products');
    getProducts()
  }, [])

  return (
    <>
    {isLoading? <Spinner /> :
    <div className='flex flex-col bg-slate-200 px-10 overflow-x-scroll justify-center items-center'>
      <h1 className='text-2xl text-bold'>LISTA DE PRODUCTOS</h1>
      <input
        type="text"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        placeholder="Buscar por código, título o marca"
        className= "my-4 w-[40%]"
      />
      {showModal &&
        <div className="bg-black inset-0 fixed bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full">
          <div className="bg-slate-400 p-6 text-white text-lg flex justify-center flex-col fixed rounded-md z-20">
            <h1 className='text-center'>EDITAR PRODUCTO</h1>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex'>
              <p className='text-transform: capitalize text-gray-100 text-xl'>Titulo:</p>
              <input value={titulo} onChange={e => setTitulo(e.target.value)} className='text-black p-1 rounded-md' />
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p className='text-transform: capitalize basis-1/3'>Marca:</p>
              <input value={marca} onChange={e => setMarca(e.target.value)} className='text-black p-1 rounded-md basis-2/3'/>
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p className='text-transform: capitalize basis-1/3'>P.Costo:</p>
              <input type="number" value={precioCosto} onChange={e => setPrecioCosto(e.target.value)} className='text-black p-1 rounded-md basis-2/3'/>
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p>P.Venta:</p>
              <input type="number" value={precioVenta} onChange={e => setPrecioVenta(e.target.value)} className='text-black p-1 rounded-md'/>
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p>Proveedor:</p>
              <input value={proveedor} onChange={e => setProveedor(e.target.value)} className='text-black p-1 rounded-md'/>
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p>Codigo:</p>
              <input value={codigo} onChange={e => setCodigo(e.target.value)} className='text-black p-1 rounded-md'/>
            </span>
            <span className='bg-slate-500 p-1 rounded-md my-1 flex flex-row'>
              <p>Stock:</p>
              <input type="number" value={stock} onChange={e => setStock(e.target.value)} className='text-black p-1 rounded-md'/>
            </span>
            <div className='flex justify-center items-center mt-4'>
              {isLoading ? <Spinner /> : <>
                <button
                  className='bg-red-500 rounded-sm py-2 px-6 text-white font-bold m-5'
                  onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button
                  className='bg-cyan-500 rounded-sm py-2 px-6 text-white font-bold m-5'
                  onClick={handleSave}>Guardar</button>
              </>}
            </div>
          </div>
        </div>}
      <div className="w3-container h-full ">
        <table className="w3-table-all m-0 ">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup._id}>
              {headerGroup.headers.map(header => (
                <th key={header._id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
          <tbody className=''>
            {table.getRowModel().rows.map(row => (
              <tr key={row._id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell._id} className='text-sm'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>}</>
  )
}

export default ProductsList
