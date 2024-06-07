import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoria: String,
    titulo: String,
    marca: String,
    precioVenta: Number,
    precioCosto: Number,
    precioCostoUsd: Number,
    margen: Number,
    stock: String,
    imagen: String,
    descripcion: String,
    proveedor: String,
    codigo: {
        type: String, 
        unique: true},
    visibleEnTienda: String},
    {timeStamps: true})

const Product = mongoose.model("Product", productSchema)
export default Product