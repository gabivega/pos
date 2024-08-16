import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoria: {type: String, required: true},
    titulo: {type: String, required: true},
    marca: String,
    precioVenta: {type: Number, required: true}, 
    precioCosto: {type: Number, required: true},
    precioCostoUsd: Number,
    margen: Number,
    stock: Number,
    unidad: { type: String, default: "unidad" },
    proveedor: String,
    codigo: {type: String, unique: true},
    codigoBarras: String,
    imagenUrl: String},
    {timeStamps: true})

const Product = mongoose.model("Product", productSchema)
export default Product