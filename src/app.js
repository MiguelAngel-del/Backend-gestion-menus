import express from 'express';
import dotenv from 'dotenv';
import config from './config.js';
import cors from 'cors';

// Import routes
import productosRoutes from './routes/productos.routes.js';
import menusRoutes from './routes/menus.routes.js';
import menuproductosRoutes from './routes/menuproductos.routes.js';
import menuinstanciasRoutes from './routes/menuinstancias.routes.js';
import bitacoraRoutes from './routes/bitacora.routes.js';
import inventarioInstanciaRoutes from './routes/inventarioInstancia.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import reportesRoutes from './routes/reportes.routes.js';

dotenv.config();
const app = express();

// Lista de orígenes permitidos (desarrollo y producción)
const allowedOrigins = [
    process.env.FRONTEND_URL,       // URL del frontend en desarrollo
    process.env.FRONTEND_PROD_URL   // URL del frontend en producción
];

// Middleware de CORS configurado dinámicamente
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Settings
app.set('port', config.port);

// Routes
app.use("/gestionmenus", productosRoutes);
app.use("/gestionmenus", menusRoutes);
app.use("/gestionmenus", menuproductosRoutes);
app.use("/gestionmenus", menuinstanciasRoutes);
app.use("/gestionmenus", bitacoraRoutes);
app.use("/gestionmenus", inventarioInstanciaRoutes);
app.use("/gestionmenus", usuarioRoutes);
app.use("/gestionmenus", reportesRoutes);

export default app;