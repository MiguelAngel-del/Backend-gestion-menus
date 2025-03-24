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

dotenv.config();
const app = express();

// Settings
app.set('port', config.port);

// Middlewares
app.use(cors({
    origin: "http://localhost:3000", // Reemplaza con la URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/gestionmenus", productosRoutes);
app.use("/gestionmenus", menusRoutes);
app.use("/gestionmenus", menuproductosRoutes);
app.use("/gestionmenus", menuinstanciasRoutes);
app.use("/gestionmenus", bitacoraRoutes);
app.use("/gestionmenus", inventarioInstanciaRoutes);

export default app;
