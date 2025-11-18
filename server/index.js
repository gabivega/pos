import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv"
import loginRoutes from "./routes/auth.js"
import editUserRoutes from "./routes/user.js"
import productsRoutes from "./routes/products.js"
import categoriesRoutes from "./routes/categories.js"
import proveedoresRoutes from "./routes/proveedores.js"
import posRoutes from "./routes/pos.js"
import clientesRoutes from "./routes/clientes.js"
import path from 'path';

const app = express()
dotenv.config()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.use(
  cors({
    origin: "https://pos-front.onrender.com/",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => console.log(`servidor funcionando en puerto ${PORT}`));
const router = express.Router()

//MONGODB CONNECTION
const mongoDb = process.env.MONGODB_URL
mongoose.set("strictQuery", false)
mongoose.connect(mongoDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connected to DB");
}).catch((err) => console.log(err))

//OBTENER VALOR DOLAR BLUE
const fetchDolarBlueValue = async () => {
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const data = await response.json();

    // Obtén el valor de venta del dólar blue
    return data.blue.value_sell;
  } catch (error) {
    console.error('Error al obtener el valor del dólar blue', error);
  }
};

fetchDolarBlueValue().then((value) => {
  console.log(value);
})

app.use(loginRoutes)
app.use(editUserRoutes)
app.use(productsRoutes)
app.use(categoriesRoutes)
app.use(proveedoresRoutes)
app.use(posRoutes)
app.use(clientesRoutes)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  console.log(`Serving ${req.url}`);
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

