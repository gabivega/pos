import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        default: ""},
    apellido: {
        type: String,
        default: ""},    
    email: {
        type: String,
        unique: [true, "Email ya registrado(desde model)"],
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8},
    telefono: {
        type: String,
        default: ""},
    ciudad: {
        type: String,
        default: ""
    },
    direccion: {
        type:String,
        default: ""},
    // rango: {
    //     type: String,
    //     default: "Comprador"
    // }   
},
{timestamps: true })

const User = mongoose.model("User", userSchema)

export default User