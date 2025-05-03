// routes/reportes.js
import express from 'express';
import { getConnection } from "../database/index.js";

const router = express.Router();

// Middleware para parsear JSON
router.use(express.json());

// Reporte por tipo de producto con filtro de fechas
router.post('/reportes/tipo', async (req, res) => {
    try {
        const { tipo, fecha_inicio, fecha_fin } = req.body;
        
        const pool = await getConnection();
        const result = await pool.query(`
            WITH totales_productos AS (
                SELECT 
                    p.nombre AS producto,
                    mp.precio_menu AS precio_unitario,  -- Nuevo campo
                    SUM(ii.cantidad_inicial) AS cantidad_total,
                    SUM(ii.cantidad_inicial * mp.precio_menu) AS total_producto
                FROM instancia_inventario ii
                JOIN menu_instancia mi ON ii.instancia_id = mi.id
                JOIN menu_producto mp ON mi.menu_id = mp.menu_id AND ii.producto_id = mp.producto_id
                JOIN producto p ON ii.producto_id = p.id
                WHERE p.tipo = $1
                    AND mi.fecha_creacion BETWEEN $2 AND $3
                GROUP BY p.nombre, mp.precio_menu  -- Agrupar por precio
            ),
            total_general AS (
                SELECT SUM(total_producto) AS total_general 
                FROM totales_productos
            )
            SELECT 
                t.producto,
                t.precio_unitario,  -- Incluir en resultados
                t.cantidad_total,
                t.total_producto,
                tg.total_general
            FROM totales_productos t
            CROSS JOIN total_general tg
        `, [tipo, fecha_inicio, fecha_fin]);

        res.json({ 
            success: true,
            data: result.rows 
        });
    } catch (error) {
        console.error('Error en reporte por tipo:', error);
        res.status(500).json({
            success: false,
            message: 'Error generando reporte por tipo'
        });
    }
});

// Reporte general con filtro de fechas
// Reporte general con filtro de fechas
router.post('/reportes/general', async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.body;
        
        const pool = await getConnection();
        const result = await pool.query(`
            WITH totales_productos AS (
                SELECT 
                    p.nombre AS producto,
                    mp.precio_menu AS precio_unitario,
                    SUM(ii.cantidad_inicial) AS cantidad_total,
                    SUM(ii.cantidad_inicial * mp.precio_menu) AS total_producto
                FROM instancia_inventario ii
                JOIN menu_instancia mi ON ii.instancia_id = mi.id
                JOIN menu_producto mp ON mi.menu_id = mp.menu_id AND ii.producto_id = mp.producto_id
                JOIN producto p ON ii.producto_id = p.id
                WHERE mi.fecha_creacion BETWEEN $1 AND $2
                GROUP BY p.nombre, mp.precio_menu
            ),
            total_general AS (
                SELECT SUM(total_producto) AS total_general 
                FROM totales_productos
            )
            SELECT 
                t.producto,
                t.precio_unitario,
                t.cantidad_total,
                t.total_producto,
                tg.total_general
            FROM totales_productos t
            CROSS JOIN total_general tg
        `, [fecha_inicio, fecha_fin]);

        res.json({ 
            success: true,
            data: result.rows 
        });
    } catch (error) {
        console.error('Error en reporte general:', error);
        res.status(500).json({
            success: false,
            message: 'Error generando reporte general'
        });
    }
});

// Reporte por menú específico
router.post('/reportes/menu', async (req, res) => {
    try {
        const { menuId } = req.body;
        
        const pool = await getConnection();
        const result = await pool.query(`
            SELECT
                m.nombre AS menu,
                p.nombre AS producto,
                mp.cantidad,
                (mp.cantidad * mp.precio_menu) AS total_producto,
                COUNT(mi.id) AS veces_usado
            FROM menu m
            JOIN menu_producto mp ON m.id = mp.menu_id
            JOIN producto p ON mp.producto_id = p.id
            LEFT JOIN menu_instancia mi ON m.id = mi.menu_id
            WHERE m.id = $1
            GROUP BY m.nombre, p.nombre, mp.cantidad, mp.precio_menu
            ORDER BY p.nombre
        `, [menuId]);

        res.json({ 
            success: true,
            data: result.rows 
        });
        
    } catch (error) {
        console.error('Error en reporte por menú:', error);
        res.status(500).json({
            success: false,
            message: 'Error generando reporte del menú'
        });
    }
});

// Reporte general de todos los menús
router.post('/reportes/menus', async (req, res) => {
    try {        
        const pool = await getConnection();
        const result = await pool.query(`
            SELECT
                m.nombre AS menu,
                p.nombre AS producto,
                mp.cantidad,
                (mp.cantidad * mp.precio_menu) AS total_producto,
                COUNT(mi.id) AS veces_usado
            FROM menu m
            JOIN menu_producto mp ON m.id = mp.menu_id
            JOIN producto p ON mp.producto_id = p.id
            LEFT JOIN menu_instancia mi ON m.id = mi.menu_id
            GROUP BY m.nombre, p.nombre, mp.cantidad, mp.precio_menu
            ORDER BY m.nombre, p.nombre
        `);

        res.json({ 
            success: true,
            data: result.rows 
        });
        
    } catch (error) {
        console.error('Error en reporte de menús:', error);
        res.status(500).json({
            success: false,
            message: 'Error generando reporte de menús'
        });
    }
});

export default router;