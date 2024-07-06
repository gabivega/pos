import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import TicketModal from '../components/TicketModal';
import '../print.css';
import { setProducts } from '../state/state';

const POSPage = () => {
  const products = useSelector(state => state.products) || [];
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const baseUrl = process.env.REACT_APP_BASEURL

  const handleAgregarProducto = (producto) => {
    const productoExistente = productosSeleccionados.find(item => item.codigo === producto.codigo);
    if (productoExistente) {
      return;
    } else {
      setProductosSeleccionados([...productosSeleccionados, { ...producto, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = productosSeleccionados.map((item, i) =>
      i === index ? { ...item, quantity: parseFloat(newQuantity) } : item
    );
    setProductosSeleccionados(updatedItems);
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedItems = productosSeleccionados.map((item, i) =>
      i === index ? { ...item, precioVenta: parseFloat(newPrice) } : item
    );
    setProductosSeleccionados(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...productosSeleccionados];
    updatedItems.splice(index, 1);
    setProductosSeleccionados(updatedItems);
  };

  const handleAddEmptyRow = () => {
    setProductosSeleccionados([
      ...productosSeleccionados,
      {
        titulo: '',
        codigo: '',
        marca: '',
        precioVenta: 0,
        quantity: 1,
        isEditable: true,
      },
    ]);
  };

  const handleOverwriteEmptyRow = (producto) => {
    const index = productosSeleccionados.findIndex(item => item.isEditable);
    if (index !== -1) {
      const updatedItems = [...productosSeleccionados];
      updatedItems[index] = { ...producto, quantity: 1 };
      setProductosSeleccionados(updatedItems);
    } else {
      handleAgregarProducto(producto);
    }
  };

  const calculateTotal = () => {
    const newTotal = productosSeleccionados.reduce(
      (acc, item) => acc + item.quantity * item.precioVenta,
      0
    );
    setTotal(newTotal);
  };

  const handleConfirmPurchase = () => {
    setShowModal(true);
  };

  const getProducts = async () => {
    const productsRequest = await fetch(`${baseUrl}/products`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    const products = await productsRequest.json();
    dispatch(setProducts({ products }));
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      calculateTotal();
    }
  }, [productosSeleccionados, loading]);

  const productoFiltrado = useMemo(() => {
    return products.filter(
      producto =>
        producto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.marca.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [filtro, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Punto de Venta (POS)</h1>
      <input
        type="text"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        placeholder="Buscar por código, título o marca"
        className="mb-6"
      />

      {filtro.length >= 3 && productoFiltrado.length > 0 && (
        <div className="border rounded p-4">
          <h2 className="text-lg font-bold mb-2">Productos encontrados:</h2>
          <ul className="list-disc pl-8">
            {productoFiltrado.map(producto => (
              <div
                key={producto.id}
                className="cursor-pointer hover:text-blue-500 border-b border-gray-500 mb-2 p-2"
                onClick={() => handleOverwriteEmptyRow(producto)}
              >
                {producto.titulo} | P.VENTA $ {producto.precioVenta} | CODIGO: {producto.codigo}
              </div>
            ))}
          </ul>
        </div>
      )}

      <div ref={printRef} className="overflow-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                Producto
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Cantidad
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                P.Costo
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Precio de Venta
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Subtotal
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productosSeleccionados.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-4 whitespace-nowrap">
                  {item.isEditable ? (
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      value={item.titulo}
                      onChange={(e) => {
                        const updatedItems = [...productosSeleccionados];
                        updatedItems[index].titulo = e.target.value;
                        setProductosSeleccionados(updatedItems);
                      }}
                    />
                  ) : (
                    item.titulo
                  )}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    step="0.001"
                    className="w-16 p-1 border rounded"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div>{item.precioCosto}</div>
                    {/* type="number"
                    step="0.01"
                    className="w-24 p-1 border rounded"
                    value={item.precioCosto}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  /> */}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    step="0.01"
                    className="w-24 p-1 border rounded"
                    value={item.precioVenta}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                </td>
                <td className="px-2 py-4 whitespace-nowrap">{(item.quantity * item.precioVenta).toFixed(2)}</td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <button className="text-red-500" onClick={() => handleRemoveItem(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-4"
          onClick={handleAddEmptyRow}
        >
          + Agregar fila
        </button>
        <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
        <button
          className="ml-4 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleConfirmPurchase}
        >
          Confirmar Compra
        </button>
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
