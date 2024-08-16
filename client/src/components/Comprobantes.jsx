import React, { useEffect, useState } from 'react';
import DetalleComprobante from './DetalleComprobante';



const Comprobantes = () => {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const [comprobantes, setComprobantes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedComprobante, setSelectedComprobante] = useState(null);


  const comprobantesList = async () => {
    const res = await fetch(`${baseUrl}/cargarcomprobantes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setComprobantes(data);
    console.log(data);
  };

  useEffect(() => {
    comprobantesList();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  const openModal = (comprobante) => {
    setSelectedComprobante(comprobante);
    console.log(comprobante);
  };

  // Filtrar comprobantes por mes
  const filteredComprobantes = comprobantes.filter(comprobante => {
    const comprobanteMonth = new Date(comprobante.Fecha).getMonth() + 1;
    return comprobanteMonth === selectedMonth;
  });

  const selectedComprobanteToggle = () => {
  setSelectedComprobante(!selectedComprobante);
  }

  return (
    <div>
      <div className='text-xl text-black'>Comprobantes</div>
      <div>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value={1}>Enero</option>
          <option value={2}>Febrero</option>
          <option value={3}>Marzo</option>
          <option value={4}>Abril</option>
          <option value={5}>Mayo</option>
          <option value={6}>Junio</option>
          <option value={7}>Julio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Septiembre</option>
          <option value={10}>Octubre</option>
          <option value={11}>Noviembre</option>
          <option value={12}>Diciembre</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full border-b border-gray-200 bg-gray-50">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Total</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Costo</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Ganancia</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Ganancia en USD</th>
          </tr>
        </thead>
        <tbody>
          {filteredComprobantes.map(comprobante => (
            <tr
              key={comprobante._id}
              onClick={()=> openModal(comprobante)}
              className={`cursor-pointer hover:bg-gray-300 ${comprobante.estado === 'pendiente' ? 'bg-red-500' : ''}`}
            >
              <td className="py-2 px-4">{new Date(comprobante.Fecha).toLocaleDateString()}</td>
              <td className="py-2 px-4">${comprobante.TotalVenta.toFixed(2)}</td>
              <td className="py-2 px-4">${comprobante.TotalCosto.toFixed(2)}</td>
              <td className="py-2 px-4">${comprobante.Ganancia.toFixed(2)}</td>
              <td className="py-2 px-4">${(comprobante.Ganancia * 0.013).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedComprobante && 
        <DetalleComprobante selectedComprobanteToggle={selectedComprobanteToggle} comprobante={selectedComprobante} asignarComprobante/>
      }
    </div>
  );
};

export default Comprobantes;
