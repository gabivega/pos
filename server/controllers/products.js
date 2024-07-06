import Categoria from "../models/categories.js";
import Product from "../models/product.js";

export const newProduct = async (req, res) => {
try {
        const {
        categoria, 
        titulo,
        marca, 
        precioVenta, 
        precioCosto,
        precioCostoUsd, 
        margen, 
        stock, 
        imagen,
        descripcion,
        proveedor,
        codigo, visibleEnTienda} = req.body
        console.log(req.body);
    const newProduct = new Product({
        categoria, 
        titulo,
        marca, 
        precioVenta, 
        precioCosto,
        precioCostoUsd, 
        margen, 
        stock, 
        imagen,
        descripcion,
        proveedor,
        codigo,
        visibleEnTienda
    })
    const savedProduct = await newProduct.save()
    console.log(savedProduct);
    console.log(savedProduct._id);
    res.status(200).json(savedProduct)
} catch (error) {
    res.status(500).json({error: error.message})
}
}

// EDITAR INDIVIDUALMENTE

export const editProduct = async (req, res) => {
  try {
          const {
          id,
          categoria, 
          titulo,
          marca, 
          precioVenta, 
          precioCosto,
          precioCostoUsd, 
          margen, 
          stock,
          descripcion,
          proveedor,
          codigo} = req.body
          console.log(req.body);
          
      const editedProduct = await Product.findByIdAndUpdate(id,{
          categoria: categoria, 
          titulo: titulo,
          marca: marca, 
          precioVenta: precioVenta, 
          precioCosto: precioCosto,
          precioCostoUsd: precioCostoUsd, 
          margen: margen, 
          stock: stock, 
          descripcion:descripcion,
          proveedor:proveedor,
          codigo:codigo,
      },
    {new: true})
      console.log("este es el producto",editedProduct);
    //  const savedProduct = await newProduct.save()
      res.status(200).json(editedProduct)
  } catch (error) {
      res.status(500).json({error: error.message})
  }
  }


export const getProducts = async(req,res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
    
  } catch (error) {
    res.status(404).json
}
}

export const actualizarPorCategoria = async (req,res) => {
  try {
  const {categoria, variacion} = req.body
  const porcentajeVariacion = parseFloat(variacion);
  console.log("variacion", porcentajeVariacion);
  const productos = await Product.find({categoria})
  console.log(productos);
  // For Loop para actualizar el costo y precio de venta de los productos filtrados
  for (const producto of productos) {
    const costoActual = parseFloat(producto.precioCosto);
    const nuevoPrecioCosto = costoActual * (1 + porcentajeVariacion / 100);
    const precioVentaActual = parseFloat(producto.precioVenta);
    const nuevoPrecioVenta =  precioVentaActual * (1 + porcentajeVariacion / 100)

    console.log("costo actual: ", costoActual);
    console.log("Nuevo precio Costo : ", nuevoPrecioCosto);
    console.log("precio venta actual: ",  precioVentaActual);
    console.log("Nuevo precio Venta: ", nuevoPrecioVenta);

    // Actualizar nuevos valores en base de datos
    await Product.updateOne(
      {_id: producto._id}, {
        $set: {
          precioCosto: nuevoPrecioCosto.toFixed(2),
          precioVenta: nuevoPrecioVenta.toFixed(2),
        }
      }
    )
  }
  res.status(200).json({message: "Precios actualizados correctamente"})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

export const actualizarPorProveedor = async (req,res) => {
  try {
  const {proveedor, variacion} = req.body
  const porcentajeVariacion = parseFloat(variacion);
  console.log("variacion", porcentajeVariacion);
  const productos = await Product.find({proveedor})
  console.log(productos);
  // For Loop para actualizar el costo y precio de venta de los productos filtrados
  for (const producto of productos) {
    const costoActual = parseFloat(producto.precioCosto);
    const nuevoPrecioCosto = costoActual * (1 + porcentajeVariacion / 100);
    const precioVentaActual = parseFloat(producto.precioVenta);
    const nuevoPrecioVenta =  precioVentaActual * (1 + porcentajeVariacion / 100)

    console.log("costo actual: ", costoActual);
    console.log("Nuevo precio Costo : ", nuevoPrecioCosto);
    console.log("precio venta actual: ",  precioVentaActual);
    console.log("Nuevo precio Venta: ", nuevoPrecioVenta);

    // Actualizar nuevos valores en base de datos
    await Product.updateOne(
      {_id: producto._id}, {
        $set: {
          precioCosto: nuevoPrecioCosto.toFixed(2),
          precioVenta: nuevoPrecioVenta.toFixed(2),
        }
      }
    )
  }
  res.status(200).json({message: "Precios actualizados correctamente"})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}