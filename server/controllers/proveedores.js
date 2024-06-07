import Proveedores from "../models/proveedores.js";

// CREAR PROVEEDOR

export const crearProveedor = async (req, res) => {
try {
  console.log("solicitud recibida");
  const {proveedor} = req.body
  console.log(req.body);
  const nuevoProveedor = new Proveedores({
    proveedor
  })
  await nuevoProveedor.save()
  const proveedores = await Proveedores.find()
  res.status(200).json(proveedores)
  
} catch (error) {
  if (error.code == 11000) {    
    console.log(error);        
    res.status(409).json(error)
}
 else res.status(500).json({error: error.message})
}
}
// OBTENER PROVEEDORES
export const getProveedores = async(req, res) => {
  try {
    const proveedores = await Proveedores.find()
    res.status(200).json(proveedores)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

// ELIMINAR PROVEEDOR

export const deleteProveedor = async (req, res) => {
  try {
    const {proveedorEliminado} = req.body
    console.log(proveedorEliminado);
    const deletedProveedor = await Proveedores.deleteOne({proveedor:  `${proveedorEliminado}`})
    console.log(deletedProveedor);
    const proveedoresActualizados = await Proveedores.find()  
    res.status(200).json(proveedoresActualizados)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}
