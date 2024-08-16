import express from "express"
import {cargarComprobantes, guardarComprobante } from "../controllers/pos.js"

const router = express.Router()

router.post("/guardarcomprobante", guardarComprobante)
router.get("/cargarcomprobantes", cargarComprobantes)

export default router