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

// Lee de .env o usa valores por defecto
const DEV_FRONTEND  = process.env.FRONTEND_URL      || 'http://localhost:3000';
const PROD_FRONTEND = process.env.FRONTEND_PROD_URL || 'https://frontend-gestion-menus.onrender.com';

// Lista de orígenes permitidos
const allowedOrigins = [
  DEV_FRONTEND,
  PROD_FRONTEND
];

app.use(cors({
  origin: (origin, callback) => {
    // permitir peticiones sin origin (Postman, tests) o que estén en la whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true
}));

// Middlewares para parseo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Puerto (se usará en src/index.js al arrancar)
app.set('port', config.port);

// Rutas bajo /gestionmenus
app.use('/gestionmenus', productosRoutes);
app.use('/gestionmenus', menusRoutes);
app.use('/gestionmenus', menuproductosRoutes);
app.use('/gestionmenus', menuinstanciasRoutes);
app.use('/gestionmenus', bitacoraRoutes);
app.use('/gestionmenus', inventarioInstanciaRoutes);
app.use('/gestionmenus', usuarioRoutes);
app.use('/gestionmenus', reportesRoutes);

export default app;
