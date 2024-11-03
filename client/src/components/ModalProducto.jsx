import React, { useState } from "react";
import Spinner from "./Spinner";
import editProduct from "../Functions/editProduct";

const ModalProducto = ({
  saveFunction,
  modalToggle,
  tableRow,
  toggleLoading,
  getProducts,
}) => {
  //  console.log(editarProducto())
  const [titulo, setTitulo] = useState(tableRow.titulo || "");
  const [marca, setMarca] = useState(tableRow.marca || "");
  const [precioCosto, setPrecioCosto] = useState(tableRow.precioCosto || "");
  const [precioVenta, setPrecioVenta] = useState(tableRow.precioVenta || "");
  const [codigo, setCodigo] = useState(tableRow.codigo || "");
  const [stock, setStock] = useState(tableRow.stock || "");
  const [proveedor, setProveedor] = useState(tableRow.proveedor || "");
  // const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const editando = editando;
  const editedProduct = {
    id: tableRow._id,
    titulo,
    marca,
    precioCosto,
    precioVenta,
    codigo,
    stock,
    proveedor,
  };

  const baseUrl = process.env.REACT_APP_BASEURL;

  return (
    <div>
      <div className="bg-black inset-0 fixed bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full h-full">
        <div className="bg-slate-400 p-6 text-white text-lg flex justify-center flex-col fixed rounded-md z-20">
          <h1 className="text-center">EDITAR PRODUCTO</h1>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex">
            <p className="text-transform: capitalize text-gray-100 text-xl">
              Titulo:
            </p>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-black p-1 rounded-md"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p className="text-transform: capitalize basis-1/3">Marca:</p>
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="text-black p-1 rounded-md basis-2/3"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p className="text-transform: capitalize basis-1/3">P.Costo:</p>
            <input
              type="number"
              value={precioCosto}
              onChange={(e) => setPrecioCosto(e.target.value)}
              className="text-black p-1 rounded-md basis-2/3"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p>P.Venta:</p>
            <input
              type="number"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
              className="text-black p-1 rounded-md"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p>Proveedor:</p>
            <input
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className="text-black p-1 rounded-md"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p>Codigo:</p>
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="text-black p-1 rounded-md"
            />
          </span>
          <span className="bg-slate-500 p-1 rounded-md my-1 flex flex-row">
            <p>Stock:</p>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="text-black p-1 rounded-md"
            />
          </span>
          <div className="flex justify-center items-center mt-4">
            <>
              <button
                className="bg-red-500 rounded-sm py-2 px-6 text-white font-bold m-5"
                onClick={() => modalToggle()}
              >
                Cancelar
              </button>
              <button
                className="bg-cyan-500 rounded-sm py-2 px-6 text-white font-bold m-5"
                onClick={() =>
                  editProduct(editedProduct, modalToggle, getProducts)
                }
              >
                Guardar
              </button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProducto;

// const handleSave = async () => {
//   setIsLoading(true)
//   const updatedFields = {
//     "id": editando._id,
//     titulo,
//     marca,
//     precioCosto,
//     precioVenta,
//     descripcion,
//     codigo,
//     proveedor,
//     stock
//   };

//   // Filtrar los campos que no se han modificado o que están vacíos
//   const fieldsToUpdate = {};
//   for (let key in updatedFields) {
//     if (updatedFields[key] !== undefined && updatedFields[key] !== editando[key]) {
//       fieldsToUpdate[key] = updatedFields[key];
//     }
//   }

//   try {
//     const response = await fetch(`${baseUrl}/editproduct`, {
//       method: 'PATCH',
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(fieldsToUpdate)
//     });

//     if (!response.ok) {
//       throw new Error("Error al actualizar el producto");
//     }

//     const result = await response.json();
//     console.log(result);
//     getProducts()
//     setShowModal(false);
//   } catch (error) {
//     console.error("Error al actualizar el producto:", error);
//   }
//   setIsLoading(false)
// };
