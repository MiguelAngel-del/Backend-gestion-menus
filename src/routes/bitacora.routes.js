import { Router } from "express";
import { getBitacoraInstancia, createBitacora, getBitacoraProducto } from "../controllers/bitacora.controller.js";

const router = Router();

// Rutas de Bitácora
router.get("/bitacora/:idinstancia", getBitacoraInstancia); // Obtener registros de bitácora por instancia
router.post("/bitacora", createBitacora);                  // Crear un registro en bitácora
router.get("/bitacora/:idinstancia/:idproducto", getBitacoraProducto); // Obtener registro específico en bitácora

export default router;
