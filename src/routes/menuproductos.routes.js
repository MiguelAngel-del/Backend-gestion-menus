import { Router } from "express";
import { getProductosMenu, getProductosMenuT, addProductoMenu, updateProductoMenu, deleteProductoMenu } from "../controllers/menuproductos.controller.js";

const router = Router();

// Rutas de Productos en Menús
router.get("/menuproductos/:idmenu", getProductosMenu); // Obtener Productos de un Menú
router.get("/menuproductos", getProductosMenuT);        // Obtener Todos los Productos
router.post("/menuproductos", addProductoMenu);         // Agregar Producto a un Menú
router.put("/menuproductos/:idmenu/:idproducto", updateProductoMenu); // Actualizar Producto
router.delete("/menuproductos/:idmenu/:idproducto", deleteProductoMenu);


export default router;
