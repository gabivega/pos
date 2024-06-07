import express from "express";
import { crearProveedor, getProveedores, deleteProveedor } from "../controllers/proveedores.js";

const router = express.Router();

router.post("/crearProveedor", crearProveedor);
router.get("/getProveedores", getProveedores)
router.delete("/deleteProveedor", deleteProveedor)

export default router;