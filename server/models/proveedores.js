import mongoose from "mongoose";

const proveedoresSchema = new mongoose.Schema ({
  proveedor :{
    type: String,
    unique : [true, "Proveedor ya existente"],
    required: true
  },
})

const Proveedores = mongoose.model("proveedores", proveedoresSchema )
export default Proveedores