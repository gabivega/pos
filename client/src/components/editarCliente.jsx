import React, { useState, useEffect } from "react";

const EditarCliente = ({ toggleModalEditar, cliente }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const baseUrl = process.env.REACT_APP_BASEURL;

  // Inicializar los estados con los valores del cliente cuando el componente se monta o cuando el cliente cambia
  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre || "");
      setEmail(cliente.email || "");
      setTelefono(cliente.telefono || "");
      setDireccion(cliente.direccion || "");
    }
  }, [cliente]);

  // Manejar la edición del cliente
  const handleEditCliente = async (e) => {
    e.preventDefault();
    const updatedCliente = {
      nombre,
      email,
      telefono,
      direccion,
    };

    const res = await fetch(`${baseUrl}/clientes/${cliente._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCliente),
    });

    const data = await res.json();
    // Actualiza la lista de clientes si es necesario
    // setClientes(prevClientes => prevClientes.map(c => c._id === cliente._id ? data : c));

    toggleModalEditar(); // Cerrar el modal después de editar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 relative">
        <div className="p-4 border-black border-[1px]">
          <h1 className="text-2xl font-bold mb-4">Ficha Cliente</h1>
          <h4>Datos:</h4>
          <form onSubmit={handleEditCliente} className="mb-4">
            <div className="mb-2">
              <label className="block">Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Teléfono:</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Dirección:</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-black font-bold p-2 rounded"
            >
              Guardar Cambios
            </button>
          </form>
          <button
            onClick={toggleModalEditar}
            className="bg-red-500 text-black font-bold p-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
