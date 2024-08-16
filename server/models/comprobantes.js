import mongoose from "mongoose";

const comprobantesSchema = new mongoose.Schema ({
  Numero :{
    type: Number,
    unique : [true, "Comprobante ya existente"],
    required: true
  },
  Fecha: Date,
  TotalVenta: Number,
  TotalCosto: Number,
  Ganancia:Number,
  Detalle: Object,
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes',
    required: false // Puedes hacer que este campo sea opcional si lo deseas
  },
  estado: {
    type: String,
    enum: ['pago', 'pendiente'], // Limita el estado a 'pago' o 'pendiente'
    default: 'pago'
  }
})

const Comprobante = mongoose.model("comprobante", comprobantesSchema)
export default Comprobante
