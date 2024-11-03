import "./App.css";
import "./print.css";
import Header from "./components/Header";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Ofertas from "./pages/ofertas";
import Ayuda from "./pages/ayuda";
import Contacto from "./pages/contacto";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Categorias from "./pages/categorias";
import Carrito from "./pages/carrito";
import NuevoProducto from "./pages/nuevoproducto";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard";
import ActualizarPrecios from "./components/ActualizarPrecios";
import CategoriasPanel from "./components/CategoriasPanel";
import ProveedoresPanel from "./components/ProveedoresPanel";
import ProductsList from "./components/ProductsList";
import PaginaProducto from "./pages/paginaProducto";
import POSPage from "./pages/pos";
import Comprobantes from "./components/Comprobantes";
import Clientes from "./pages/clientes";
import ListadoGeneral from "./components/listadoGeneral";

function App() {
  return (
    <BrowserRouter className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<POSPage />} />
            <Route path="nuevoproducto" element={<NuevoProducto />} />
            <Route path="actualizarprecios" element={<ActualizarPrecios />} />
            <Route path="actualizarcategorias" element={<CategoriasPanel />} />
            <Route
              path="actualizarproveedores"
              element={<ProveedoresPanel />}
            />
            <Route path="actualizarproductos" element={<ProductsList />} />
            <Route path="comprobantes" element={<Comprobantes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/producto/:id" element={<PaginaProducto />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/listadogeneral" element={<ListadoGeneral />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
