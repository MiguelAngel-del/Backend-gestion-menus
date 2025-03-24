import { getConnection, querysMenus } from "../database/index.js";

// --------------------- GET: Obtener Todos los Menús ---------------------
export const getMenus = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(querysMenus.getMenus);
        connection.release();
        res.json(result.rows);
    } catch (error) {
        console.error("Error in getMenus:", error);
        res.status(500).send("Error obteniendo menús");
    }
};

// --------------------- GET BY ID: Obtener Menú por ID ---------------------
export const getMenusById = async (req, res) => {
    try {
        const { idmenu } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenus.getMenu, [idmenu]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Menú no encontrado." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error in getMenusById:", error);
        res.status(500).send("Error obteniendo el menú.");
    }
};

// --------------------- POST: Crear Nuevo Menú ---------------------
export const createMenu = async (req, res) => {
    try {
        const { nombre } = req.body;
        const connection = await getConnection();
        const result = await connection.query(querysMenus.postMenu, [nombre]);
        connection.release();
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error in createMenu:", error);
        res.status(500).send("Error creando el menú.");
    }
};

// --------------------- PUT: Actualizar Menú por ID ---------------------
export const updateMenu = async (req, res) => {
    try {
        const { idmenu } = req.params;
        const { nombre } = req.body;
        const connection = await getConnection();
        const result = await connection.query(querysMenus.putMenu, [nombre, idmenu]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Menú no encontrado." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error in updateMenu:", error);
        res.status(500).send("Error actualizando el menú.");
    }
};

// --------------------- DELETE: Eliminar Menú por ID ---------------------
export const deleteMenu = async (req, res) => {
    try {
        const { idmenu } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenus.deleteMenu, [idmenu]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Menú no encontrado." });
        }

        res.json({ msg: "Menú eliminado correctamente." });
    } catch (error) {
        console.error("Error in deleteMenu:", error);
        res.status(500).send("Error eliminando el menú.");
    }
};
