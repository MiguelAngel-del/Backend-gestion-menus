
  export const querysProductos = {
    getProductos: "SELECT * FROM producto ORDER BY precio_global DESC;",
    getProducto: "SELECT * FROM producto WHERE id = $1",
    postProducto: "INSERT INTO producto (nombre, precio_global, tipo) VALUES ($1, $2, $3) RETURNING *",
    putProducto: "UPDATE producto SET nombre = $1, precio_global = $2, tipo = $3 WHERE id = $4 RETURNING *",
    deleteProducto: "DELETE FROM producto WHERE id = $1",
    searchProductos: `
    SELECT *
    FROM public.producto
    WHERE nombre ILIKE '%' || $1 || '%'
    ORDER BY nombre;

  `,
  };
  
  export const querysMenus = {
    getMenus: `SELECT m.id, m.nombre, m.total, m.fecha_actualizacion, 
              json_agg(mp.*) as productos FROM menu m
              LEFT JOIN menu_producto mp ON m.id = mp.menu_id
              GROUP BY m.id
              ORDER BY m.id;
`,
    getMenu: `SELECT m.id, m.nombre, m.total, m.fecha_actualizacion,
              json_agg(mp.*) as productos
              FROM menu m
              LEFT JOIN menu_producto mp ON m.id = mp.menu_id
              WHERE m.id = $1
              GROUP BY m.id`,
    postMenu: "INSERT INTO menu (nombre) VALUES ($1) RETURNING *",
    putMenu: "UPDATE menu SET nombre = $1 WHERE id = $2 RETURNING *",
    deleteMenu: "DELETE FROM menu WHERE id = $1"
  };
  
  export const querysMenuProductos = {
    getTodosProductosMenu: `
    SELECT mp.menu_id, m.nombre AS nombre_menu, mp.producto_id, p.nombre AS nombre_producto,
           mp.cantidad, mp.precio_menu
    FROM menu_producto mp
    JOIN producto p ON mp.producto_id = p.id
    JOIN menu m ON mp.menu_id = m.id
    ORDER BY mp.menu_id, mp.producto_id;`,
    getProductosMenu: `
    SELECT mp.*, p.nombre 
    FROM menu_producto mp
    JOIN producto p ON mp.producto_id = p.id
    WHERE mp.menu_id = $1;`,
    postProductoMenu: `
        INSERT INTO menu_producto (menu_id, producto_id, cantidad, precio_menu)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
    putProductoMenu: `
        UPDATE menu_producto 
        SET cantidad = $1, precio_menu = $2
        WHERE menu_id = $3 AND producto_id = $4
        RETURNING *;`,
    deleteProductoMenu: `
        DELETE FROM menu_producto
        WHERE menu_id = $1 AND producto_id = $2;`,
    getMenuProducto: `
        SELECT mp.*, p.nombre 
        FROM menu_producto mp
        JOIN producto p ON mp.producto_id = p.id
        WHERE mp.menu_id = $1 AND mp.producto_id = $2;`
};


export const querysMenuInstancias = {
    postInstancia: `
    INSERT INTO menu_instancia (menu_id) 
    VALUES ($1) 
    RETURNING *`,
    // Obtiene todas las instancias de un menú específico
    getInstanciasMenu: `
      SELECT
        mi.id,
        mi.menu_id,
        mi.version,
        mi.fecha_creacion,
        mi.total_instancia,
        m.nombre AS nombre_menu
      FROM menu_instancia mi
      JOIN menu m ON mi.menu_id = m.id
      WHERE mi.menu_id = $1
    `,
    
    // Obtiene una sola instancia por su ID
    getInstancia: `
      SELECT
        mi.id,
        mi.menu_id,
        mi.version,
        mi.fecha_creacion,
        mi.total_instancia,
        m.nombre AS nombre_menu
      FROM menu_instancia mi
      JOIN menu m ON mi.menu_id = m.id
      WHERE mi.id = $1
    `,
    
    // Crea una nueva instancia (retorna las columnas principales)
    postInstancia: `
      INSERT INTO menu_instancia (menu_id)
      VALUES ($1)
      RETURNING id, menu_id, version, fecha_creacion, total_instancia
    `,
    
    // Elimina una instancia y retorna los campos afectados
    deleteInstancia: `
      DELETE FROM menu_instancia
      WHERE id = $1
      RETURNING id, menu_id, version, fecha_creacion, total_instancia
    `,
    
    // Actualiza la instancia (solo menú_id en este ejemplo) y retorna sus campos
    putInstancia: `
      UPDATE menu_instancia
      SET menu_id = $1
      WHERE id = $2
      RETURNING id, menu_id, version, fecha_creacion, total_instancia
    `
  };
  
  
  export const querysInventarioInstancias = {
    getInventarioInstancia: `
        SELECT ii.*, p.nombre as producto
        FROM instancia_inventario ii
        JOIN producto p ON ii.producto_id = p.id
        WHERE ii.instancia_id = $1`,
    getProductoInventario: `
        SELECT * FROM instancia_inventario
        WHERE instancia_id = $1 AND producto_id = $2`
  };
  
  export const querysBitacora = {
    getBitacoraInstancia: `
        SELECT b.*, p.nombre as producto
        FROM bitacora b
        JOIN producto p ON b.producto_id = p.id
        WHERE b.instancia_id = $1
        ORDER BY b.fecha_hora ASC;`,
    postBitacora: `
        INSERT INTO bitacora (instancia_id, producto_id, cantidad_retirada)
        VALUES ($1, $2, $3)
        RETURNING *`,
    getBitacoraProducto: `
        SELECT * FROM bitacora
        WHERE producto_id = $1 AND instancia_id = $2`
  };
  
  // Consultas adicionales útiles
  export const querysReportes = {
    getTotalMenus: `
        SELECT m.nombre, COUNT(mi.id) as usos, SUM(m.total) as total_base
        FROM menu m
        LEFT JOIN menu_instancia mi ON m.id = mi.menu_id
        GROUP BY m.id`,
    getHistorialMenu: `
        SELECT mi.id as instancia_id, m.nombre, mi.version,
               b.fecha_hora, b.mensaje
        FROM menu_instancia mi
        JOIN menu m ON mi.menu_id = m.id
        LEFT JOIN bitacora b ON mi.id = b.instancia_id
        WHERE mi.menu_id = $1`
  };

  export const querysUsuario = {
    createUsuario: `
      INSERT INTO usuario (nombre, usuario, contraseña) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `,
    getUsuarioByUsername: `
      SELECT * FROM usuario 
      WHERE usuario = $1;
    `
  };