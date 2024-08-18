import express from "express"
import { crearCliente, getClientes, removeClientes,estadoComprobante} from "../controllers/clientes.js"

const router = express.Router();

router.post("/crearcliente", crearCliente);
router.get("/getclientes", getClientes)
router.delete("/deletecliente", removeClientes)
router.patch("/estadocomprobante", estadoComprobante)
//router.patch("/asignarComprobante", editCliente)

export default router