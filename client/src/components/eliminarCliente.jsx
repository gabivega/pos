import React from 'react'

const EliminarCliente = ({removeClient, closeModalEliminar, removeClienteId}) => {

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className= "bg-white flex items-center justify center flex-col p-5 rounded-lg">
          <div className="text-center text-xl p-4  font-bold mb-4">
            Desea eliminar este cliente?
          </div>
          <div className="flex gap-4">
            <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick = {closeModalEliminar}>Cancelar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeClient(removeClienteId)}>Eliminar</button>
          </div>        
        </div>
      </div>
  )
}

export default EliminarCliente


