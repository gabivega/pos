import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import loginRoutes from './routes/auth.js';
import editUserRoutes from './routes/user.js';
import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import proveedoresRoutes from './routes/proveedores.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

//const FRONT_URL = process.env.FRONT_URL;

app.use(cors({
  origin: 'https://pos-front.onrender.com/',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true, // Permitir credenciales si es necesario
}));

//app.options('*', cors()); // Manejar solicitudes preflight

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));

const router = express.Router();

// Conexión a MongoDB
const mongoDb = process.env.MONGODB_URL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to DB');
}).catch((err) => console.log(err));

// Rutas
app.use(loginRoutes);
app.use(editUserRoutes);
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use(proveedoresRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  console.log(`Serving ${req.url}`);
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
