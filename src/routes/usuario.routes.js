// src/routes/usuario.routes.js
import { Router } from "express";
import { createUsuario, loginUsuario } from "../controllers/usuario.controller.js";

const router = Router();

// POST para crear un usuario (en caso de que quieras registrar)
router.post("/usuario", createUsuario);

// POST para login
router.post("/usuario/login", loginUsuario);

export default router;
