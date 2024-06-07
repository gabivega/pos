import Categoria from "../models/categories.js";

// CREATE CATEGORIE:

export const createCategory = async (req, res) => {
try {
  const {nombreCategoria, margenCategoria} = req.body
  console.log(req.body);
  const newCategoria = new Categoria({
    nombreCategoria, margenCategoria
  })
  await newCategoria.save()
  const categorias = await Categoria.find()
  res.status(200).json(categorias)
  
} catch (error) {
  if (error.code == 11000) {    
    console.log(error);        
    res.status(409).json(error)
}
 else res.status(500).json({error: error.message})
}
}
// GET CATEGORIES
export const getCategories = async(req, res) => {
  try {
    const categorias = await Categoria.find()
  //  console.log(categorias);
    res.status(200).json(categorias)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

// DELETE CATEGORY

export const deleteCategory = async (req, res) => {
  try {
    const {categoriaSeleccionada} = req.body
    console.log(categoriaSeleccionada);
    const categoria = await Categoria.deleteOne({nombreCategoria: `${categoriaSeleccionada}`})
    console.log(categoria);
    const categoriasActualizadas = await Categoria.find()  
    res.status(200).json(categoriasActualizadas)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}
// EDIT CATEGORY

export const editCategory = async (req, res) => {
  try {
    console.log(req.body);
    const {nombreCategoria, margenCategoria} = req.body
    console.log(nombreCategoria);
    console.log(margenCategoria);
    const categoria = await Categoria.findOneAndUpdate({nombreCategoria: nombreCategoria}, {margenCategoria: margenCategoria})
    console.log(categoria);
    const categoriasActualizadas = await Categoria.find()  
    console.log(categoriasActualizadas);
    res.status(200).json("recibido")
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}