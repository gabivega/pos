import Comprobante from "../models/comprobantes.js";
import Product from "../models/product.js";
export const guardarComprobante = async (req, res) => {
  try {
    const { products, total } = req.body;
    let totalCosto = 0;
    let totalVenta = 0;

    // Arrays para almacenar los costos y las ventas
    const costos = [];
    const ventas = [];

    products.forEach((async (producto) => {
      const quantity = producto.quantity ?? 0;
      const precioCosto = producto.precioCosto ?? 0;
      const precioVenta = producto.precioVenta ?? 0;
      const _id = producto._id ?? null;
      const stock = producto.stock ?? 0;
      console.log(quantity,precioCosto,precioVenta, _id, stock);
      // Añadir los costos y ventas al array
      //chequear si producto trae precio de costo
      if (precioCosto === undefined){
        precioCosto = 0
      }
      costos.push(precioCosto * quantity);
      ventas.push(precioVenta * quantity);
      // ACTUALIZAR STOCK
      // Verificar si el producto tiene un _id y stock mayor a 0
       if (_id && stock > 0) {
        try {
          await Product.updateOne({ _id }, { $set: { stock: stock - quantity } });
          console.log(`Stock actualizado para el producto ${_id}`);
        } catch (error) {
          console.error(`Error al actualizar el stock del producto ${_id}:`, error);
        }
        } 
        else {
        console.log(`Producto ${producto.titulo} no requiere actualización de stock.`);
      }
    }));

    // Sumar todos los elementos en los arrays
    totalCosto = costos.reduce((acc, curr) => acc + curr, 0);
    totalVenta = ventas.reduce((acc, curr) => acc + curr, 0);

    // Calcular la ganancia
    const ganancia = (totalVenta - totalCosto).toFixed(2);

    console.log('Total Costo:', totalCosto);
    console.log('Total Venta:', totalVenta);
    console.log('Ganancia del ticket:', ganancia);

    // Generar el número de comprobante
    const lastComprobante = await Comprobante.findOne().sort({ Numero: -1 });
    const newNumero = lastComprobante ? lastComprobante.Numero + 1 : 1;

    const newComprobante = new Comprobante({
      Numero: newNumero,
      Fecha: new Date(),
      TotalVenta: totalVenta,
      TotalCosto: totalCosto,
      Ganancia: ganancia,
      Detalle: products
    });

    await newComprobante.save();



    res.status(200).json({ ganancia, comprobante: newComprobante });

  } catch (error) {
    console.error("Error al guardar el comprobante:", error);
    res.status(500).json({ error: error.message });
  }
};

export const cargarComprobantes = async (req, res) => {
  try {
    const comprobantes = await Comprobante.find();
    res.status(200).json(comprobantes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
