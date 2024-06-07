import express from "express"
import { newProduct , getProducts, actualizarPorCategoria, actualizarPorProveedor} from "../controllers/products.js";

const router = express.Router();

router.post("/newproduct", newProduct);
router.get("/products", getProducts);
// router.get("/visibleproducts", getVisibleProducts);
router.patch("/actualizarPorCategoria", actualizarPorCategoria)
router.patch("/actualizarPorProveedor", actualizarPorProveedor)

export default router;