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
  process.env.FRONTEND_URL,       // e.g. "http://localhost:3000"
  process.env.FRONTEND_PROD_URL   // e.g. "https://tudominio.com"
];

// Middleware de CORS configurado dinámicamente
app.use(cors({
  origin: (origin, callback) => {
    // Si la petición no tiene origen (p.e. desde Postman) o está en la lista, la dejamos pasar
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middlewares para parsear JSON y formularios URL‑encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Puerto de la aplicación
app.set('port', config.port);

// Rutas de la API, todas bajo el prefijo /gestionmenus
app.use("/gestionmenus", productosRoutes);
app.use("/gestionmenus", menusRoutes);
app.use("/gestionmenus", menuproductosRoutes);
app.use("/gestionmenus", menuinstanciasRoutes);
app.use("/gestionmenus", bitacoraRoutes);
app.use("/gestionmenus", inventarioInstanciaRoutes);
app.use("/gestionmenus", usuarioRoutes);
app.use("/gestionmenus", reportesRoutes);

export default app;
