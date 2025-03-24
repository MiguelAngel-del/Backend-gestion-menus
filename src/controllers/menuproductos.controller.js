import { getConnection, querysMenuProductos } from "../database/index.js";

// GET: Productos de un Menú por `idmenu`
export const getProductosMenu = async (req, res) => {
    try {
        const { idmenu } = req.params;
        const connection = await getConnection();
        const result = await connection.query(querysMenuProductos.getProductosMenu, [idmenu]);
        connection.release();
        res.json(result.rows);
    } catch (error) {
        console.error("Error in getProductosMenu:", error);
        res.status(500).send("Error obteniendo productos del menú");
    }
};

// GET: Todos los Productos de Todos los Menús
export const getProductosMenuT = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(querysMenuProductos.getTodosProductosMenu);
        connection.release();
        res.json(result.rows);
    } catch (error) {
        console.error("Error in getProductosMenu:", error);
        res.status(500).send("Error obteniendo productos de todos los menús");
    }
};

// POST: Agregar Producto a un Menú
// Modificar el controlador POST para manejar el precio por defecto
export const addProductoMenu = async (req, res) => {
    try {
      const { idmenu, idproducto, cantidad, precio_menu } = req.body;
      
      let precioFinal = precio_menu;
      
      // Si no se envía precio_menu, obtener el precio global
      if (!precio_menu) {
        const connection = await getConnection();
        const productoResult = await connection.query(
          'SELECT precio_global FROM producto WHERE id = $1', 
          [idproducto]
        );
        connection.release();
        
        if (productoResult.rows.length === 0) {
          return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        precioFinal = productoResult.rows[0].precio_global;
      }
  
      const connection = await getConnection();
      const result = await connection.query(querysMenuProductos.postProductoMenu, [
        idmenu, 
        idproducto, 
        cantidad, 
        precioFinal
      ]);
      connection.release();
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error in addProductoMenu:", error);
      res.status(500).json({ error: error.message });
    }
  };

// DELETE: Eliminar Producto de un Menú
export const deleteProductoMenu = async (req, res) => {
    try {
        const { idmenu, idproducto } = req.params;

        // Validar que los parámetros sean números
        const menuId = parseInt(idmenu);
        const productoId = parseInt(idproducto);

        if (isNaN(menuId) || isNaN(productoId)) {
            return res.status(400).json({ error: "IDs inválidos" });
        }

        // Conexión a la base de datos
        const connection = await getConnection();
        const result = await connection.query(
            querysMenuProductos.deleteProductoMenu,
            [menuId, productoId] // Aquí se pasan los parámetros en el orden correcto
        );
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Producto no encontrado en el menú" });
        }

        res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error detallado:", {
            message: error.message,
            stack: error.stack,
            query: querysMenuProductos.deleteProductoMenu
        });
        res.status(500).json({ 
            error: "Error interno del servidor",
            details: error.message 
        });
    }
};


// PUT: Actualizar Producto de un Menú
export const updateProductoMenu = async (req, res) => {
    try {
        const { idmenu, idproducto } = req.params;
        const { cantidad, precio_menu } = req.body;
        const connection = await getConnection();
        const result = await connection.query(querysMenuProductos.putProductoMenu, [
            cantidad, precio_menu, idmenu, idproducto
        ]);
        connection.release();

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Producto no encontrado." });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error in updateProductoMenu:", error);
        res.status(500).send("Error actualizando producto del menú");
    }
};
