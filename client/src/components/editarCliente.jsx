import React, { useState, useEffect } from 'react';

const EditarCliente = ({closeModal}) => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const baseUrl = process.env.REACT_APP_BASEURL;

  // Obtener la lista de clientes
  const fetchClientes = async () => {
    const res = await fetch(`${baseUrl}/clientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Manejar la creación de un nuevo cliente
  const handleAddCliente = async (e) => {
    e.preventDefault();
    const newCliente = {
      nombre,
      email,
      telefono,
      direccion,
    };
    
    const res = await fetch(`${baseUrl}/crearcliente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCliente),
    });
    const data = await res.json();
    setClientes([...clientes, data]);
    setNombre('');
    setEmail('');
    setTelefono('');
    setDireccion('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 relative">
     <div className="p-4 border-black border-[1px]">
      <h1 className="text-2xl font-bold mb-4">Nuevo Cliente</h1>
      <form onSubmit={handleAddCliente} className="mb-4">
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
        <button type="submit" className="bg-blue-500 text-black font-bold p-2 rounded">
          Guardar Cliente
        </button>        
      </form>
      <button onClick={closeModal}>Cancelar</button>
    </div>
  </div>
</div>
   
  );
};

export default EditarCliente;
