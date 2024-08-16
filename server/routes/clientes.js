import express from "express"
import { crearCliente, getClientes, removeClientes, editCliente} from "../controllers/clientes.js"

const router = express.Router();

router.post("/crearcliente", crearCliente);
router.get("/getclientes", getClientes)
router.delete("/deletecliente", removeClientes)
router.patch("/editcliente", editCliente)
router.patch("/asignarComprobante", editCliente)

export default router