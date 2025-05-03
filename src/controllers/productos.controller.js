import { getConnection, querysProductos } from "../database/index.js";


// busacar producto por nombre
// --------------------- GET: Buscar Productos por Nombre ---------------------
export const searchProductos = async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ msg: "Parámetro de búsqueda 'q' requerido." });
      }
  
      const connection = await getConnection();
      const result = await connection.query(querysProductos.searchProductos, [q]);
      connection.release();
      //ver desde consula la catidad de veces que se usa
      console.log("Cantidad de veces que se usa la consulta: ", result.rowCount);
      //console.log(result.rows);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: "No se encontraron productos con ese término." });
      }
  
      res.json(result.rows);
    } catch (error) {
      console.error("Error in searchProductos:", error);
      res.status(500).send("Error buscando productos.");
    }
  };
  

// --------------------- GET: Obtener Todos los Productos ---------------------
export const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(querysProductos.getProductos);
        connection.release();
        res.json(result.rows); // Devuelve todos los productos
    } catch (error) {
        console.error("Error in getProductos:", error);
        res.status(500).send("Error obteniendo productos");
    }
};

// --------------------- GET BY ID: Obtener Producto por ID ---------------------
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysProductos.getProducto, [id]);
        connection.release();

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Producto no encontrado." });
        }

        res.json(result.rows[0]); // Devuelve el producto encontrado
    } catch (error) {
        console.error("Error in getProductoById:", error);
        res.status(500).send("Error obteniendo el producto.");
    }
};

// --------------------- POST: Crear Nuevo Producto ---------------------
export const createProducto = async (req, res) => {
    try {
        const { nombre, precio_global, tipo } = req.body;

        // Validaciones básicas
        if (!nombre || !precio_global|| !tipo) {
            return res.status(400).json({ msg: "Faltan datos requeridos: nombre y precio_global." });
        }

        const connection = await getConnection();
        const result = await connection.query(querysProductos.postProducto, [nombre, precio_global, tipo]);
        connection.release();
        res.status(201).json(result.rows[0]); // Devuelve el producto creado
    } catch (error) {
        console.error("Error in createProducto:", error);
        res.status(500).send("Error creando el producto.");
    }
};

// --------------------- PUT: Actualizar Producto por ID ---------------------
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio_global, tipo } = req.body;

        if (!nombre || !precio_global || !tipo) {
            return res.status(400).json({ msg: "Faltan datos requeridos: nombre y precio_global." });
        }

        const connection = await getConnection();
        const result = await connection.query(querysProductos.putProducto, [nombre, precio_global, tipo, id]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Producto no encontrado." });
        }

        res.json(result.rows[0]); // Devuelve el producto actualizado
    } catch (error) {
        console.error("Error in updateProducto:", error);
        res.status(500).send("Error actualizando el producto.");
    }
};

// --------------------- DELETE: Eliminar Producto por ID ---------------------
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysProductos.deleteProducto, [id]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Producto no encontrado." });
        }

        res.json({ msg: "Producto eliminado correctamente." });
    } catch (error) {
        console.error("Error in deleteProducto:", error);
        res.status(500).send("Error eliminando el producto.");
    }
};
