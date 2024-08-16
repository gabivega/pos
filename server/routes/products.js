import express from "express"
import { newProduct , getProducts, actualizarPorCategoria, actualizarPorProveedor, editProduct, cargaMasiva , deleteProduct} from "../controllers/products.js";

const router = express.Router();

router.post("/newproduct", newProduct);
router.get("/products", getProducts);
router.patch("/editproduct", editProduct)
// router.get("/visibleproducts", getVisibleProducts);
router.patch("/actualizarPorCategoria", actualizarPorCategoria)
router.patch("/actualizarPorProveedor", actualizarPorProveedor)
router.post("/cargaMasiva", cargaMasiva)
router.delete("/deleteProduct", deleteProduct)

export default router;