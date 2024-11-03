import ListaClientes from "../components/ListaClientes";
import React from "react";
import NuevoCliente from "../components/NuevoCliente";
import { useState } from "react";
import EditarCliente from "../components/editarCliente";

const Clientes = () => {
  const [showAddClientes, setShowAddClientes] = useState(false);
  const [buttonText, setButtonText] = useState("Crear Nuevo Cliente");
  const [showEditarCliente, setShowEditarCliente] = useState(false);
  const [showEliminarCliente, setShowEliminarCliente] = useState(false);
  const [clientesCounter, setClientesCounter] = useState(0);

  const openModal = () => {
    setShowAddClientes(true);
    setButtonText("Cancelar");
  };
  const openModalEditar = () => {
    console.log("openmodaleditar");
  };
  const openModalEliminar = () => {
    console.log("openmodaleliminar");
  };

  const closeModal = () => {
    setShowAddClientes(false);
    setButtonText("Crear Nuevo Cliente");
  };
  const closeModalEditar = () => {
    console.log("closemodaleditar");
  };

  return (
    <div>
      <ListaClientes
        openModalEditar={openModalEditar}
        openModalEliminar={openModalEliminar}
        clientesCounter={clientesCounter}
      />
      <button onClick={showAddClientes ? closeModal : openModal}>
        {buttonText}
      </button>
      {showAddClientes && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 relative">
            <NuevoCliente
              closeModal={closeModal}
              setClientesCounter={setClientesCounter}
            />
          </div>
        </div>
      )}
      {showEditarCliente && <EditarCliente closeModal={closeModalEditar} />}
    </div>
  );
};

export default Clientes;
