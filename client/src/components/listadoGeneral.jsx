import React, { useMemo, useState, useEffect, useCallback } from "react";
import Spinner from "./Spinner";
import { Virtuoso } from "react-virtuoso"; // Debes instalarla: npm install react-virtuoso

const ListadoGeneral = () => {
  const [productosBase, setProductosBase] = useState([]); // Fuente de verdad única
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  const baseUrl = process.env.REACT_APP_BASEURL;

  // 1. Carga inicial: Solo una vez
  const getListadoGeneral = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/listadoGeneral`);
      const listado = await response.json();
      setProductosBase(listado);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListadoGeneral();
  }, []);

  // 2. Extraer proveedores (Memoizado para que no se recalcule si no cambian los productos)
  const listaProveedores = useMemo(() => {
    const set = new Set(productosBase.map(p => p.proveedor).filter(Boolean));
    return Array.from(set).sort();
  }, [productosBase]);

  // 3. LÓGICA DE FILTRADO COMBINADA (La clave de la performance)
  const productosFiltrados = useMemo(() => {
    let resultado = productosBase;

    // Filtro por proveedor
    if (proveedorSeleccionado) {
      resultado = resultado.filter(p => p.proveedor === proveedorSeleccionado);
    }

    // Filtro por texto
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      resultado = resultado.filter(p => 
        p.titulo?.toLowerCase().includes(term) ||
        p.codigo?.toLowerCase().includes(term) ||
        p.proveedor?.toLowerCase().includes(term)
      );
    }

    return resultado;
  }, [productosBase, searchTerm, proveedorSeleccionado]);


  const addToInventory = async (product) => {
    try {
      setIsLoading(true);
      console.log("Añadiendo:", product);
      await fetch(`${baseUrl}/newProduct`, {
        method : "POST",
        headers: {"content-type":"application/JSON"},
        body: JSON.stringify(product)})   
    } catch (error) {
      console.log("error: ", error.message)
    }
    
    finally {

      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col bg-slate-200 h-screen w-full overflow-hidden">
      {/* Header y Filtros */}
      <div className="p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-4">LISTA DE PRODUCTOS ({productosFiltrados.length})</h1>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-gray-600">Buscador global:</label>
            <input
              type="text"
              placeholder="Buscar por código, título o marca..."
              className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {listaProveedores.map((prov) => (
              <button
                key={prov}
                onClick={() => setProveedorSeleccionado(prov)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  proveedorSeleccionado === prov 
                  ? "bg-blue text-white" 
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                {prov}
              </button>
            ))}
            {(proveedorSeleccionado || searchTerm) && (
              <button
                onClick={() => { setProveedorSeleccionado(null); setSearchTerm(""); }}
                className="bg-red-700 px-3 py-1 text-white rounded-full text-sm"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading && <Spinner />}

      {/* LISTADO VIRTUALIZADO (Reemplaza la tabla estática) */}
      <div className="flex-grow p-4">
        <div className="h-full bg-white rounded-lg shadow overflow-hidden flex flex-col">
          {/* Header de la "tabla" */}
          <div className="grid grid-cols-12 gap-2 p-3 bg-slate-800 text-white font-bold">
            <div className="col-span-2">Proveedor</div>
            <div className="col-span-2">Código</div>
            <div className="col-span-5">Título</div>
            <div className="col-span-2">Precio</div>
            <div className="col-span-1 text-center">+</div>
          </div>

          <Virtuoso
            data={productosFiltrados}
            useWindowScroll={false}
            itemContent={(index, producto) => (
              <div className={`grid grid-cols-12 gap-2 p-3 border-b items-center hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="col-span-2 text-sm truncate">{producto.proveedor}</div>
                <div className="col-span-2 font-mono text-sm">{producto.codigo}</div>
                <div className="col-span-5 text-sm font-medium">{producto.titulo}</div>
                <div className="col-span-2 text-green-700 font-bold">${producto.precio.toLocaleString()}</div>
                <div className="col-span-1 text-center">
                  <button 
                    onClick={() => addToInventory(producto)}
                    className="bg-blue-500 hover:bg-blue-700 text-blue w-8 h-8 rounded-full shadow"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ListadoGeneral;