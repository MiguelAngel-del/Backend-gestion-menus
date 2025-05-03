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

// Construye la lista de orígenes permitidos
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
  'http://localhost:3000' // <-- Asegúrate de que esté presente
].filter(Boolean);
// Durante el desarrollo, añade localhost:3000
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
}

console.log('➜  CORS allowed origins:', allowedOrigins);

// Middleware CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // <-- Permite cookies
  exposedHeaders: ['Authorization'] // <-- Opcional, si usas JWT
}));

// Para manejar el preflight (OPTIONS) en todas las rutas
app.options('*', cors());

// Middlewares de body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas bajo /gestionmenus
app.use('/gestionmenus', productosRoutes);
app.use('/gestionmenus', menusRoutes);
app.use('/gestionmenus', menuproductosRoutes);
app.use('/gestionmenus', menuinstanciasRoutes);
app.use('/gestionmenus', bitacoraRoutes);
app.use('/gestionmenus', inventarioInstanciaRoutes);
app.use('/gestionmenus', usuarioRoutes);
app.use('/gestionmenus', reportesRoutes);

// Puerto
app.set('port', config.port);

export default app;
