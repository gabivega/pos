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
})

const Comprobante = Mongoose.Schema("comprobante", comprobantesSchema )
export default Comprobante