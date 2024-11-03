import mongoose from "mongoose";

const listadoGeneralSchema = new mongoose.Schema(
  {
    proveedor: { type: String, required: true },
    codigo: String,
    titulo: { type: String, required: true },
    precio: { type: String, required: true },
    imagenUrl: String,
  },
  { timeStamps: true },
);

export default mongoose.model("ListadoGeneral", listadoGeneralSchema);
