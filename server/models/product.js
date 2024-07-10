import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoria: String,
    titulo: String,
    marca: String,
    precioVenta: Number,
    precioCosto: Number,
    precioCostoUsd: Number,
    margen: Number,
    stock: Number,
    proveedor: String,
    codigo: {
        type: String, 
        unique: true},},
    {timeStamps: true})

const Product = mongoose.model("Product", productSchema)
export default Product