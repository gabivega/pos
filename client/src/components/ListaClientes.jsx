import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EliminarCliente from "./eliminarCliente";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { setClients } from "../state/state";
import EditarCliente from "./editarCliente";

const ListaClientes = ({
  openModalEditar,
  openModalEliminar,
  clientesCounter,
}) => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [comprobantes, setComprobantes] = useState([]);
  const [assignedComprobantes, setAssignedComprobantes] = useState([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [showEliminarCliente, setShowEliminarCliente] = useState(false);
  const [removeClienteId, setRemoveClienteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editandoCliente, setEditandoCliente] = useState(false);

  const baseUrl = process.env.REACT_APP_BASEURL;

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch clientes y comprobantes al montar el componente
    fetchClientes();
    fetchComprobantes();
  }, [clientesCounter]);

  const fetchClientes = async () => {
    // Fetch clientes desde la API
    const res = await fetch(`${baseUrl}/getclientes`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    dispatch(setClients(data));
    setClientes(data);
  };

  const removeClient = async (id) => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/deletecliente`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    // console.log(data);
    fetchClientes();
    setIsLoading(false);
    window.alert("Cliente Eliminado con exito");
    setShowEliminarCliente(false);
  };

  //actualizar cliente
  const asignarComprobante = async (cliente, comprobante) => {
    const datos = {
      cliente: cliente._id,
      comprobante: comprobante._id,
    };
    const res = await fetch(`${baseUrl}/asignarComprobante`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ datos }),
    });
    const data = await res.json();
    //  console.log(data);
  };
  const openModalRemove = (id) => {
    setShowEliminarCliente(true);
    setRemoveClienteId(id);
    //   console.log(id);
  };

  const fetchComprobantes = async () => {
    // Fetch comprobantes desde la API
    const res = await fetch("/api/comprobantes");
    const data = await res.json();
    setComprobantes(data);
  };

  // const fetchAssignedComprobantes = async (clienteId) => {
  //   // Fetch comprobantes asignados a un cliente
  //   const res = await fetch(`/api/clientes/${clienteId}/comprobantes`);
  //   const data = await res.json();
  //   setAssignedComprobantes(data);
  // };

  const handleAssignComprobante = async (comprobante) => {
    // Asignar comprobante a un cliente
    const res = await fetch(
      `/api/clientes/${selectedCliente.id}/comprobantes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comprobanteId: comprobante.id }),
      },
    );
    const data = await res.json();
    setAssignedComprobantes([...assignedComprobantes, data]);
  };

  const closeModalEliminar = () => {
    setShowEliminarCliente(false);
  };

  const toggleModalEditar = (cliente) => {
    setSelectedCliente(cliente);
    setEditandoCliente(!editandoCliente);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Clientes</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Teléfono</th>
                <th className="py-2 px-4 border-b">Dirección</th>
                <th className="py-2 px-4 border-b">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleModalEditar(cliente)}
                >
                  <td className="py-2 px-4 border-b">{cliente.nombre}</td>
                  <td className="py-2 px-4 border-b">{cliente.email}</td>
                  <td className="py-2 px-4 border-b">{cliente.telefono}</td>
                  <td className="py-2 px-4 border-b">{cliente.direccion}</td>
                  <td className="py-2 px-4 border-b z-10">
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        openModalRemove(cliente._id);
                      }}
                    />
                  </td>
                  {/* <td className="py-2 px-4 border-b"><FaEdit onClick={() => openModalEditar()} /></td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {selectedCliente && (
            <div>
              <h2>{selectedCliente.nombre}</h2>

              <h3>Comprobantes Pendientes</h3>
              <ul>
                {comprobantes.map((comprobante) => (
                  <li
                    key={comprobante.id}
                    onClick={() => handleAssignComprobante(comprobante)}
                  >
                    {comprobante.Fecha} - ${comprobante.TotalVenta}
                  </li>
                ))}
              </ul>
              <h3>Historial de Comprobantes Asignados</h3>
              <ul>
                {assignedComprobantes.map((comprobante) => (
                  <li key={comprobante.id}>
                    {comprobante.Fecha} - ${comprobante.TotalVenta} -{" "}
                    {comprobante.estado}
                    {comprobante.estado === "pagado" &&
                      ` - Pagado el ${new Date(
                        comprobante.fechaPago,
                      ).toLocaleDateString()}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showEliminarCliente && (
            <EliminarCliente
              removeClient={removeClient}
              closeModalEliminar={closeModalEliminar}
              removeClienteId={removeClienteId}
            />
          )}
          {editandoCliente && (
            <EditarCliente
              cliente={selectedCliente}
              toggleModalEditar={toggleModalEditar}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ListaClientes;
