import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema ({
  nombreCategoria :{
    type: String,
    unique : [true, "Categoria ya registrada(desde model)"],
    required: true
  },
  margenCategoria : Number,
  subCategoria : {},
})

const Categoria = mongoose.model("categorias", categoriesSchema )
export default Categoria