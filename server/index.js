import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv"
import loginRoutes from "./routes/auth.js"
import editUserRoutes from "./routes/user.js"
import productsRoutes from "./routes/products.js"
import categoriesRoutes from "./routes/categories.js"
import proveedoresRoutes from "./routes/proveedores.js"
import path from 'path';


const app = express()
dotenv.config()
app.use(express.json())
app.use(
    cors({
      origin: "https://pos-front.onrender.com/",
      methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    }),
  );
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`servidor funcionando en puerto ${PORT}`));
const router = express.Router()


//MONGODB CONNECTION
const mongoDb = process.env.MONGODB_URL
mongoose.set("strictQuery", false)
mongoose.connect(mongoDb, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("connected to DB");
}).catch((err)=> console.log(err))

// app.get("/", (req, res) => {    
//     res.send(`hola putoooo estamos en port ${PORT}`)  
// })

app.use(loginRoutes)
app.use(editUserRoutes)
app.use(productsRoutes)
app.use(categoriesRoutes)
app.use(proveedoresRoutes)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  console.log(`Serving ${req.url}`);
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });