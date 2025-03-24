import { Router } from "express";
import {
    getInstanciasMenu,
    getInstancia,
    postInstancia,
    deleteInstancia,
    putInstancia
} from "../controllers/menuinstancias.controller.js";

const router = Router();

router.get("/menuinstancias/:idmenu", getInstanciasMenu); // Obtener todas las instancias de un menú por ID
router.get("/menuinstancia/:id", getInstancia);          // Obtener una instancia específica por ID
router.post("/menuinstancia", postInstancia);            // Crear una nueva instancia
router.put("/menuinstancia/:id", putInstancia);          // Actualizar una instancia por ID
router.delete("/menuinstancia/:id", deleteInstancia);    // Eliminar una instancia por ID

export default router;
