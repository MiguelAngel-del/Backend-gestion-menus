// src/controllers/usuario.controller.js
import bcrypt from 'bcrypt';
import { getConnection } from "../database/index.js";
import { querysUsuario } from "../database/querys.js";

// (A) Crear Usuario (con contraseña encriptada)
export const createUsuario = async (req, res) => {
  try {
    const { nombre, usuario, contraseña } = req.body;

    // Validaciones básicas
    if (!nombre || !usuario || !contraseña) {
      return res.status(400).json({ msg: "Faltan datos requeridos: nombre, usuario y contraseña." });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Guardar en BD
    const connection = await getConnection();
    const result = await connection.query(querysUsuario.createUsuario, [
      nombre, 
      usuario, 
      hashedPassword
    ]);
    connection.release();

    // Retornar el usuario creado (sin la contraseña)
    const nuevoUsuario = result.rows[0];
    delete nuevoUsuario.contraseña; // Para no exponer la contraseña en la respuesta

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error en createUsuario:", error);
    return res.status(500).json({ msg: "Error creando el usuario." });
  }
};

// (B) Login de Usuario
export const loginUsuario = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Validaciones
    if (!usuario || !contraseña) {
      return res.status(400).json({ msg: "Faltan credenciales: usuario y contraseña." });
    }

    const connection = await getConnection();
    const result = await connection.query(querysUsuario.getUsuarioByUsername, [usuario]);
    connection.release();

    if (result.rows.length === 0) {
      // No existe el usuario
      return res.status(401).json({ msg: "Credenciales inválidas (usuario no encontrado)." });
    }

    // Validar contraseña con bcrypt
    const userFromDB = result.rows[0];
    const match = await bcrypt.compare(contraseña, userFromDB.contraseña);

    if (!match) {
      return res.status(401).json({ msg: "Credenciales inválidas (contraseña incorrecta)." });
    }

    // Login exitoso: podrías generar un JWT o devolver un mensaje
    delete userFromDB.contraseña; // Ocultamos la contraseña
    return res.json({
      msg: "Login exitoso",
      user: userFromDB
    });
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    return res.status(500).json({ msg: "Error en el servidor al hacer login." });
  }
};
