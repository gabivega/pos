import Clientes from "../models/clientes.js";
import Comprobantes from "../models/comprobantes.js";

export const crearCliente = async (req, res) => {
  const { nombre, email, telefono, direccion, CUIT, IVA } = req.body;
  try {
    const newCliente = new Clientes({
      nombre,
      email,
      telefono,
      direccion,
      CUIT, 
      IVA
    });
    console.log(newCliente);
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (error) {
    if (error.code == 11000) {
      console.log(error);
      res.status(409).json(error);
    } else {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export const getClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const removeClientes = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    await Clientes.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully" });
    console.log(`Client ${id} deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const estadoComprobante = async (req,res) => {

    const {comprobante, cliente, estado} = req.body
    console.log(req.body);
    console.log("cliente:",cliente);
    console.log("comprobante",comprobante);
    console.log("estado", estado)
    try { 
      if (cliente) {
      // chequear si el cliente posee ese comprobante:
        const chequeoComprobante = await Clientes.findById(cliente)
        const existeComprobante = chequeoComprobante.comprobantes.includes(comprobante)
        console.log(existeComprobante);
        if (!existeComprobante) {
          const clienteActualizado = await Clientes.findByIdAndUpdate(cliente, {$push:{comprobantes:comprobante}, estado:estado},
            {new: true})
            console.log("clienteActualizado", clienteActualizado, "comprobante", comprobante);}
        else {console.log(`El Cliente ${cliente} cliente ya posee este comprobante`);}
        }          
          //Actualizar Estado
            const actualizarComprobante = await Comprobantes.findByIdAndUpdate(comprobante, {estado:estado}, {new:true})
            res.status(200).json({message:"Estado de comprobante actualizado",
            comprobante:actualizarComprobante})
          
      }
  catch (error) {
    res.status(500).json({error:error.message})
  }  
}