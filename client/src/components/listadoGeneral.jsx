import React, { useMemo, useState, useEffect } from "react";
import Spinner from "./Spinner";

const ListadoGeneral = () => {
  const [productos, setProductos] = useState([]);
  const [productosIniciales, setProductosIniciales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BASEURL;

  const getListadoGeneral = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/listadoGeneral`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const listado = await response.json();
      setProductos(listado);
      setProductosIniciales(listado);
      // console.log(filtrarProveedores(listado));

      return listado;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtrarProveedores = (listado) => {
    const proveedores = new Set();
    listado.forEach((producto) => {
      if (producto.proveedor) {
        proveedores.add(producto.proveedor);
      }
    });
    // Convierte el Set a un array
    return Array.from(proveedores);
  };

  // funcion filtrar
  let productosFiltrados = [];

  const filtroPorProveedor = (proveedor) => {
    setIsLoading(true);
    productos.forEach((producto) => {
      if (producto.proveedor === proveedor) {
        productosFiltrados.push(producto);
      }
    });
    setProductos(productosFiltrados);
    setIsLoading(false);
  };
  //funcion limpiar filtro
  const limpiarFiltro = () => {
    setIsLoading(true);
    setProductos(productosIniciales);
    productosFiltrados = [];
    setIsLoading(false);
  };

  //funcion añadir a inventario
  const addToInventory = async (product) => {
    // console.log(product);
  };

  useEffect(() => {
    getListadoGeneral();
  }, []);

  return (
    <div className="flex flex-col bg-slate-200 px-10 overflow-x-scroll justify-start items-center p-4 w-full">
      <div>
        <h1 className="text-2xl text-bold">LISTA DE PRODUCTOS</h1>
        <input
          type="text"
          placeholder="Buscar por código, título o marca"
          className="my-4 w-[40%]"
        />
      </div>
      <div>
        <h1>Filtrar Por Proveedor:</h1>
        <div className="flex gap-4">
          {filtrarProveedores &&
            filtrarProveedores(productos).map((proveedor) => (
              <button
                className="bg-blue p-2 text-white text-bold rounded-md"
                onClick={() => filtroPorProveedor(proveedor)}
              >
                {proveedor}
              </button>
            ))}

          <button
            class="bg-red-800 p-2 text-white text-bold rounded-md"
            onClick={() => limpiarFiltro()}
          >
            Limpiar Filtro
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      <table className="table-fixed border-separate border-spacing-2 border border-slate-500 ">
        <thead className="bg-slate-200 border border-slate-800">
          <tr className="border border-slate-800">
            <th className="w-1/8 text-start">Proveedor</th>
            <th class="w-[100px] text-start">Codigo</th>
            <th className="w-1/2">Titulo</th>
            <th className="w-1/8">Precio</th>
            {/* <th>Imagen</th> */}
            <th className="w-1/8">+</th>
          </tr>
        </thead>
        <tbody>
          {productos &&
            productos.map((producto) => {
              //   if(producto.proveedor !== "Ñandu")
              {
                return (
                  <tr className="border-[1px] border-black">
                    <td className="border-[1px] border-black">
                      {producto.proveedor}
                    </td>
                    <td className="w-[50px]">{producto.codigo}</td>
                    <td>{producto.titulo}</td>
                    <td>{producto.precio}</td>
                    {/* <td><img src={producto.imagenUrl} className="w-[30px] h-[30px]"/></td> */}
                    <td
                      class="cursor-pointer"
                      onClick={() => addToInventory(producto)}
                    >
                      +
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>

      {/* {productos? (productos.map((producto) => {
      <h2>{producto.titulo}</h2>
    })) : <>No hay productos</>} */}
    </div>
  );
};

export default ListadoGeneral;
