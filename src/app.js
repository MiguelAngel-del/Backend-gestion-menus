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

// URLs del frontend: asegúrate de NO poner “/” al final
const DEV_FRONTEND  = process.env.FRONTEND_URL      || 'http://localhost:3000';
const PROD_FRONTEND = process.env.FRONTEND_PROD_URL || 'https://frontend-gestion-menus.onrender.com';

// Lista de orígenes permitidos
const allowedOrigins = [
  DEV_FRONTEND,
  PROD_FRONTEND
];

// 1) CORS global con opciones extra para “preflight”
app.use(cors({
  origin: (origin, callback) => {
    // Permitimos si no hay origin (Postman, tests) o si está en la whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true,
  // forzamos que OPTIONS responda 200 en vez de 204 (por compatibilidad)
  optionsSuccessStatus: 200
}));

// 2) Garantizamos que el preflight OPTIONS se capture en TODAS las rutas
app.options('*', cors());

// Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuramos el puerto
app.set('port', config.port);

// Montamos las rutas bajo /gestionmenus
app.use('/gestionmenus', productosRoutes);
app.use('/gestionmenus', menusRoutes);
app.use('/gestionmenus', menuproductosRoutes);
app.use('/gestionmenus', menuinstanciasRoutes);
app.use('/gestionmenus', bitacoraRoutes);
app.use('/gestionmenus', inventarioInstanciaRoutes);
app.use('/gestionmenus', usuarioRoutes);
app.use('/gestionmenus', reportesRoutes);

export default app;