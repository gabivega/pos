import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../state/state";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso"; // Imprescindible para los 20k
import Spinner from "../components/Spinner";
import TicketModal from "../components/TicketModal";

const POSPage = () => {
  const products = useSelector((state) => state.products) || [];
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASEURL;

  // 1. Fetch al Listado General
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/listadoGeneral`);
      const data = await response.json();
      dispatch(setProducts({ products: data }));
    } catch (error) {
      console.error("Error al obtener listado general:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) getProducts();
    else setLoading(false);
  }, []);

  // 2. Filtro optimizado (useMemo)
  const productoFiltrado = useMemo(() => {
    if (filtro.length < 3) return [];
    const term = filtro.toLowerCase();
    return products.filter(
      (p) =>
        p.codigo?.toLowerCase().includes(term) ||
        p.titulo?.toLowerCase().includes(term) ||
        p.proveedor?.toLowerCase().includes(term)
    );
  }, [filtro, products]);

  // 3. Manejo de Selección (Aquí ocurre la "magia" de conversión de modelos)
  const handleSelectProduct = (p) => {
    // Normalizamos el precio: de String a Number
    const costo = typeof p.precio === 'string' 
      ? parseFloat(p.precio.replace(/[^0-9.-]+/g, "")) 
      : p.precio;
    
    const nuevoProducto = {
      _id: p._id,
      titulo: p.titulo,
      codigo: p.codigo,
      proveedor: p.proveedor,
      precioCosto: costo || 0,
      precioVenta: (costo || 0) * 2, // Tu lógica de margen genérico
      quantity: 1,
      isEditable: false
    };

    setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
    setFiltro(""); // Limpiar buscador
    inputRef.current.focus();
  };

  // 4. Cálculos y Handlers
  useEffect(() => {
    const newTotal = productosSeleccionados.reduce(
      (acc, item) => acc + item.quantity * item.precioVenta,
      0
    );
    setTotal(newTotal);
  }, [productosSeleccionados]);

  const handleQuantityChange = (index, val) => {
    const updated = [...productosSeleccionados];
    updated[index].quantity = parseFloat(val) || 0;
    setProductosSeleccionados(updated);
  };

  const handlePriceChange = (index, val) => {
    const updated = [...productosSeleccionados];
    updated[index].precioVenta = parseFloat(val) || 0;
    setProductosSeleccionados(updated);
  };

  const handleRemoveItem = (index) => {
    setProductosSeleccionados(productosSeleccionados.filter((_, i) => i !== index));
  };

  const handleConfirmPurchase = async () => {
    try {
      const response = await fetch(`${baseUrl}/guardarcomprobante`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          products: productosSeleccionados,
          total: total.toFixed(2),
          fecha: new Date()
        }),
      });
      if (response.ok) setShowModal(true);
    } catch (error) {
      console.error("Error al guardar comprobante", error);
    }
  };

  // Handler para editar el título en la tabla
  const handleTitleChange = (index, newTitle) => {
    const updated = [...productosSeleccionados];
    updated[index].titulo = newTitle;
    setProductosSeleccionados(updated);
  };

  const formatoMoneda = (valor) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(valor);
};

  if (loading) return <Spinner />;
  if (!user) return navigate("/login");

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100 min-w-screen">
      <h1 className="text-2xl font-bold mb-4">Punto de Venta (Listado General)</h1>
      
      {/* Buscador con Resultados Virtualizados */}
      <div className="relative mb-6">
        <input
          ref={inputRef}
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Escriba 3 letras para buscar en 20,000 productos..."
          className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {filtro.length >= 3 && (
          <div className="absolute z-10 w-full bg-white border mt-1 shadow-xl rounded-b-lg max-h-[400px] overflow-hidden">
            <div className="p-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b">
              Resultados: {productoFiltrado.length}
            </div>
            <Virtuoso
              style={{ height: "350px" }}
              data={productoFiltrado}
         itemContent={(index, p) => {
  // Limpiamos el precio por si viene como string con puntos/comas
  const costoNum = typeof p.precio === 'string' 
    ? parseFloat(p.precio.replace(/[^0-9.-]+/g, "")) 
    : p.precio;
  const ventaNum = costoNum * 2;

  return (
    <div
      className="p-2 border-b hover:bg-blue-50 cursor-pointer grid grid-cols-12 gap-2 items-center transition-colors"
      onClick={() => handleSelectProduct(p)}
    >
      {/* Columna Título y Info: ocupa 8 de 12 espacios */}
      <div className="col-span-8 flex flex-col min-w-0">
        <span className="font-semibold text-sm text-slate-700 truncate">
          {p.titulo}
        </span>
        <p className="text-[10px] text-gray-400 uppercase truncate">
          <span className="font-mono">#{p.codigo}</span> | {p.proveedor}
        </p>
      </div>

      {/* Columna Costo: ocupa 2 de 12 espacios */}
      <div className="col-span-2 text-right">
        <span className="text-[11px] block text-gray-400 leading-none">Costo</span>
        <span className="text-xs font-medium text-slate-500">
          {formatoMoneda(costoNum)}
        </span>
      </div>

      {/* Columna Venta: ocupa 2 de 12 espacios */}
      <div className="col-span-2 text-right">
        <span className="text-[11px] block text-green-500 leading-none font-bold">Venta</span>
        <span className="text-sm font-bold text-blue-600">
          {formatoMoneda(ventaNum)}
        </span>
      </div>
    </div>
  );
}}
            />
          </div>
        )}
      </div>

      {/* Tabla de Venta Actual */}
      <div className="bg-white rounded-lg shadow overflow-hidden flex-grow">
        <table className="min-w-full divide-y divide-gray-200 width-[100%]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left w-2/5">Producto</th>
              <th className="px-4 py-3 text-left">Cant.</th>
              <th className="px-4 py-4 text-right">P. Costo</th>
              <th className="px-4 py-3 text-left">P. Venta</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
              <th className="px-4 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productosSeleccionados.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                  <input
                    type="text"
                    value={item.titulo}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    className="w-full bg-transparent border-b border-transparent focus:border-blue-300 focus:outline-none font-medium text-slate-700"
                  />
                  <p className="text-[10px] text-gray-400 font-mono">{item.codigo}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{item.proveedor}</p>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="w-20 p-1 border rounded"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  {/* El costo ahora es un input por si necesitas ajustarlo también */}
                  <input
                    type="number"
                    className="w-28 p-2 border rounded-md text-right bg-gray-50 text-gray-500 text-sm"
                    value={item.precioCosto}
                    onChange={(e) => {
                       const updated = [...productosSeleccionados];
                       updated[index].precioCosto = parseFloat(e.target.value) || 0;
                       setProductosSeleccionados(updated);
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="w-24 p-1 border rounded"
                    value={item.precioVenta}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                </td>
                <td className="px-4 py-2 font-bold">
                  ${(item.quantity * item.precioVenta).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700">
                    <BsFillTrashFill size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productosSeleccionados.length === 0 && (
          <div className="p-10 text-center text-gray-400">No hay productos en la venta actual</div>
        )}
      </div>

      {/* Footer de Totales */}
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold">
          TOTAL: <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
        <div className="space-x-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform active:scale-95"
            onClick={handleConfirmPurchase}
            disabled={productosSeleccionados.length === 0}
          >
            CONFIRMAR COMPRA
          </button>
        </div>
      </div>

      {showModal && (
        <TicketModal
          productosSeleccionados={productosSeleccionados}
          total={total}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default POSPage;