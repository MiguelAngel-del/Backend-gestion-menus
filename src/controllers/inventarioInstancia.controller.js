import { getConnection, querysInventarioInstancias } from "../database/index.js";

// --------------------- GET: Inventario por Instancia ---------------------
export const getInventarioInstancia = async (req, res) => {
    try {
        const { idinstancia } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysInventarioInstancias.getInventarioInstancia, [idinstancia]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Inventario no encontrado para la instancia especificada." });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error in getInventarioInstancia:", error);
        res.status(500).send("Error obteniendo inventario de la instancia.");
    }
};

// --------------------- GET: Producto específico en Inventario ---------------------
export const getProductoInventario = async (req, res) => {
    try {
        const { idinstancia, idproducto } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysInventarioInstancias.getProductoInventario, [idinstancia, idproducto]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Producto no encontrado en el inventario de la instancia especificada." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error in getProductoInventario:", error);
        res.status(500).send("Error obteniendo el producto del inventario.");
    }
};
