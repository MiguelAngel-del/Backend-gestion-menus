import { getConnection, querysBitacora } from "../database/index.js";

// --------------------- GET: Bitácora de una Instancia ---------------------
export const getBitacoraInstancia = async (req, res) => {
    try {
        const { idinstancia } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysBitacora.getBitacoraInstancia, [idinstancia]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "No se encontraron registros en la bitácora para la instancia especificada." });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error in getBitacoraInstancia:", error);
        res.status(500).send("Error obteniendo bitácora de la instancia.");
    }
};

// --------------------- POST: Crear Registro en Bitácora ---------------------
export const createBitacora = async (req, res) => {
    try {
        const { instancia_id, producto_id, cantidad_retirada } = req.body;

        if (!instancia_id || !producto_id || !cantidad_retirada || cantidad_retirada <= 0) {
            return res.status(400).json({ msg: "Datos inválidos. Asegúrese de proporcionar instancia_id, producto_id y una cantidad_retirada válida." });
        }

        const connection = await getConnection();
        const result = await connection.query(querysBitacora.postBitacora, [instancia_id, producto_id, cantidad_retirada]);
        connection.release();
        res.status(201).json(result.rows[0]); // Devuelve el registro creado en la bitácora
    } catch (error) {
        console.error("Error in createBitacora:", error);
        res.status(500).send("Error creando registro en la bitácora.");
    }
};

// --------------------- GET: Registro específico en Bitácora ---------------------
export const getBitacoraProducto = async (req, res) => {
    try {
        const { idinstancia, idproducto } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysBitacora.getBitacoraProducto, [idproducto, idinstancia]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Registro no encontrado en la bitácora para el producto en la instancia especificada." });
        }

        // Cambiado para devolver todos los registros en lugar de solo el primero
        res.json(result.rows);
    } catch (error) {
        console.error("Error in getBitacoraProducto:", error);
        res.status(500).send("Error obteniendo registro de la bitácora.");
    }
};

