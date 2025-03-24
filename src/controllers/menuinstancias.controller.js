import { getConnection, querysMenuInstancias } from "../database/index.js";

export const getInstanciasMenu = async (req, res) => {
    try {
        const { idmenu } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenuInstancias.getInstanciasMenu, [idmenu]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "No se encontraron instancias para el menú especificado." });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error en getInstanciasMenu:", error);
        res.status(500).send("Error obteniendo las instancias del menú.");
    }
};

export const getInstancia = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenuInstancias.getInstancia, [id]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Instancia no encontrada." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error en getInstancia:", error);
        res.status(500).send("Error obteniendo la instancia.");
    }
};

export const postInstancia = async (req, res) => {
    try {
        const { menu_id } = req.body; // Asegúrate de que 'menu_id' viene en el cuerpo

        // Verificar que 'menu_id' esté presente
        if (!menu_id) {
            return res.status(400).json({ error: "El campo 'menu_id' es obligatorio." });
        }

        const connection = await getConnection();

        // Validar si el menú existe en la base de datos
        const menuExist = await connection.query("SELECT id FROM menu WHERE id = $1", [menu_id]);
        if (menuExist.rows.length === 0) {
            connection.release();
            return res.status(404).json({ error: "Menú no encontrado." });
        }

        // Crear la instancia para el menú
        const result = await connection.query(querysMenuInstancias.postInstancia, [menu_id]);
        connection.release();

        // Responder con la instancia creada
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error en postInstancia:", error); // Logging detallado del error
        res.status(500).send("Error creando la instancia.");
    }
};



export const deleteInstancia = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenuInstancias.deleteInstancia, [id]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Instancia no encontrada." });
        }

        res.json({ msg: "Instancia eliminada correctamente.", instancia: result.rows[0] });
    } catch (error) {
        console.error("Error en deleteInstancia:", error);
        res.status(500).send("Error eliminando la instancia.");
    }
};

export const putInstancia = async (req, res) => {
    try {
        const { id } = req.params;
        const { menu_id } = req.body;
        const connection = await getConnection();

        // Actualizar instancia
        const result = await connection.query(querysMenuInstancias.putInstancia, [menu_id, id]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Instancia no encontrada." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error en putInstancia:", error);
        res.status(500).send("Error actualizando la instancia.");
    }
};
