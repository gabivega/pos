import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema ({
  nombre :{
    type: String,
    unique : [true, "Cliente ya existente"],
    required: true
  },
  email :{
    type: String,
    unique : [true, "Email ya existente"],
    required: true
  },
telefono : String,
direccion :String,
CUIT: {type: String, unique: [true, "CUIT ya registrado"]},
IVA: String,
comprobantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comprobante' }]})

const Clientes=  mongoose.model("clientes", clientesSchema )
export default Clientes