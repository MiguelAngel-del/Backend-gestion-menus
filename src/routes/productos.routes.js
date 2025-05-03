import { Router } from "express";
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto, searchProductos } from "../controllers/productos.controller.js";

const router = Router();

// Rutas para Productos
router.get("/productos", getProductos);  
router.get("/productos/buscar", searchProductos)                   // Obtener todos los productos
router.get("/productos/:id", getProductoById);       // Obtener un producto por ID
router.post("/productos", createProducto);                  // Crear un nuevo producto
router.put("/productos/:id", updateProducto);        // Actualizar un producto por ID
router.delete("/productos/:id", deleteProducto);    // Eliminar un producto por ID

export default router;
