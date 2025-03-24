import { Router } from "express";
import { getMenus, getMenusById, createMenu, updateMenu, deleteMenu } from "../controllers/menus.controller.js";

const router = Router();

// Rutas de Menús
router.get("/menus", getMenus);                   // Obtener todos los menús
router.get("/menus/:idmenu", getMenusById);       // Obtener un menú por ID
router.post("/menus", createMenu);                // Crear un nuevo menú
router.put("/menus/:idmenu", updateMenu);         // Actualizar un menú por ID
router.delete("/menus/:idmenu", deleteMenu);      // Eliminar un menú por ID

export default router;
