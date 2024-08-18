import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const DetalleComprobante = ({selectedComprobanteToggle, comprobante}) => {
  const baseUrl = process.env.REACT_APP_BASEURL;
  // console.log(comprobante);
  const clients= useSelector((state) => state.clientes);
  const [cliente, setCliente] = useState(null);
  const [estadoComprobante, setEstadoComprobante] =(useState(comprobante.estado));
  const [isLoading, setIsLoading] = useState(false)

  //FORMATEAR FECHA
  const fechaFormateada = (fecha) =>{
    const date = new Date(fecha).toLocaleString("es-Es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    return date
  }

  //asignar comprobante a un cliente
  const asignarComprobante = async (cliente, comprobante, estado) => {
    setIsLoading(true)
    console.log(cliente, comprobante);
    
    const res = await fetch(`${baseUrl}/estadocomprobante`, 
      {method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cliente, comprobante, estado})
      }
    )
    const data = await res.json()
    console.log(data)
    setIsLoading(false)
    if (res.status === 200) {
      window.alert("Comprobante actualizado con exito")      
    }
    else {
      window.alert("No se pudo actualizar el comprobante")
    }
    selectedComprobanteToggle()
  }
  const handleEstadoComprobanteChange = (estado) => {
    setEstadoComprobante(estado);
  }
  
  return (    
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      {isLoading && <Spinner/>}
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 relative">
       <div className="p-4 border-black border-[1px] flex flex-col">
      <div>
        <div className='flex justify-between'>
          <h4 className="text-lg font-semibold mb-2 text-dark">N°: {comprobante.Numero}</h4> 
          <h4 className="text-lg font-semibold mb-2 text-dark">{fechaFormateada(comprobante.Fecha)}</h4>
        </div>        
        <table className="ticket-table table-auto p-4">
        <thead>
          <tr className=''>
            <th className="product-col text-xs">Producto</th>
            <th className="quantity-col text-xs">U</th>
            <th className="subtotal-col text-xs text-right">$</th>
          </tr>
        </thead>
        <tbody className='gap-4 py-8 min-h-[360px] border-b border-gray-800'>
          {comprobante.Detalle.map((item, index) => (
            <tr key={index} className='border-b border-gray-800'>
              <td className="product-col text-xs ">{item.titulo}</td>
              <td className="quantity-col text-xs text-center">{item.quantity}</td>
              <td className="subtotal-col text-xs text-right">
                {(item.quantity * item.precioVenta).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="text-lg font-semibold mb-2 text-dark">Total: ${comprobante.TotalVenta}</h4>
      <h4 className="text-lg font-semibold mb-2 text-dark">Ganancia: ${comprobante.Ganancia}</h4>
      <h4 className="text-lg font-semibold mb-2 text-dark">Estado: <select onChange={(e) => handleEstadoComprobanteChange(e.target.value)}><option>{comprobante.estado}</option><option>{comprobante.estado == "pendiente" ? "pago" : "pendiente" }</option></select></h4>
      <h4 className="text-lg font-semibold mb-2 text-dark">Asignar Cliente:</h4>
      {clients && 
        <select className='border-gray-600 border-[1px] rounded'
        onChange={(e) => {
          setCliente(e.target.value);
      }}>
          <option>Seleccione un Cliente...</option>
          {clients.map ((cliente) => 
          (<option value={cliente._id}>{cliente.nombre}</option>))}
        </select>
}
      </div>
      <div className='flex gap-4 justify-center my-2' >
        <button onClick = {() =>selectedComprobanteToggle()} className='text-white bg-red-600 rounded-md p-2 px-4'>Cancelar</button>
        <button onClick = {() =>asignarComprobante(cliente, comprobante._id, estadoComprobante)} className='text-white bg-blue rounded-md p-2 px-4'>Actualizar</button>
      </div>
    </div>
  </div>
</div>
)
}

export default DetalleComprobante