import { config } from 'dotenv'
config();

export const FRONTEND_URL = process.env.FRONTEND_URL || 'https://frontend-gestion-menus.onrender.com';

export default {
    //secretKey: process.env.SECRET_KEY || '',
    port: process.env.PORT || 4000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
}