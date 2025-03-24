import { Router } from "express";
import { getInventarioInstancia, getProductoInventario } from "../controllers/inventarioInstancia.controller.js";

const router = Router();

// Rutas de Inventario por Instancia
router.get("/inventario/:idinstancia", getInventarioInstancia); // Obtener inventario por instancia
router.get("/inventario/:idinstancia/:idproducto", getProductoInventario); // Obtener producto específico en inventario

export default router;
