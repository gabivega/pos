import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const TicketModal = ({ productosSeleccionados, total, onClose }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center no-print">
  <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-sm">
    <div ref={printRef} className="ticket-container print-only py-6 px-1 mb-4">
      <div className="ticket-header">
        <h2 className="text-md font-bold">FERRECENTRO RAFAELA</h2>
        <h3>Sarmiento 320 - Rafaela</h3>
        <h3>3492-274788</h3>
        <p className='text-sm italic'>ticket no fiscal</p>
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
          {productosSeleccionados.map((item, index) => (
            <tr key={index} className='border-b border-gray-800'>
              <td className="product-col text-xs ">{item.titulo}</td>
              <td className="quantity-col text-xs text-center">{item.quantity}</td>
              <td className="subtotal-col text-xs text-right">
                {(item.quantity * item.precioVenta).toFixed(2)}
              </td>
            </tr>
          ))}
          {/* Fill empty rows to maintain minimum height */}
          {productosSeleccionados.length < 8 && Array.from({ length: 8 - productosSeleccionados.length }).map((_, index) => (
            <tr key={`empty-${index}`} className=''>
              <td className="product-col text-xs">&nbsp;</td>
              <td className="quantity-col text-xs text-center">&nbsp;</td>
              <td className="subtotal-col text-xs text-right">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4 font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
      <h4 className='text-center font-bold my-4'>GRACIAS POR TU COMPRA!</h4>
      <br />
      <hr />
    </div>
    <div className="flex justify-end mt-4 no-print">
      <button
        className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClose}
      >
        Cerrar
      </button>
      <button
        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Imprimir
      </button>
    </div>
  </div>
</div>

  );
};

export default TicketModal;
