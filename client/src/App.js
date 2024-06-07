import './App.css';
import './print.css';
import Header from './components/Header';
import { Navigate, Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import HomePage from './pages/home.jsx';
import Ofertas from './pages/ofertas';
import Ayuda from './pages/ayuda';
import MiCuenta from './pages/miCuenta';
import Contacto from './pages/contacto';
import Login from './pages/login';
import Signup from './pages/signup';
import Categorias from './pages/categorias';
import Carrito from './pages/carrito';
import NuevoProducto from './pages/nuevoproducto';
import Footer from './components/Footer';
import Dashboard from './pages/dashboard';
import ActualizarPrecios from './components/ActualizarPrecios';
import CategoriasPanel from './components/CategoriasPanel';
import ProveedoresPanel from './components/ProveedoresPanel';
import ProductsList from './components/ProductsList';
import PaginaProducto from './pages/paginaProducto';
import POSPage from './pages/pos';

function App() {
  return (
    <BrowserRouter class="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
      <Routes>
        <Route path='/' element= {<HomePage />}>
          <Route path='/pos' element= {<POSPage/>} />
          <Route path='actualizarprecios' element= {<ActualizarPrecios/>} />
          <Route path='actualizarcategorias' element= {<CategoriasPanel />} />
          <Route path='actualizarproveedores' element= {<ProveedoresPanel />} />
          <Route path='actualizarproductos' element= {<ProductsList />} />
          <Route path='/nuevoproducto' element= {<NuevoProducto/>} />
          <Route path='/micuenta' element= {<MiCuenta/>} />

        </Route>
        <Route path='/login' element= {<Login />}/>
        <Route path='/categorias' element= {<Categorias />}/>
        <Route path='/carrito' element= {<Carrito />}/>
        <Route path='/signup' element= {<Signup />}/>
        <Route path='/ofertas' element= {<Ofertas />}/>
        <Route path='/ayuda' element= {<Ayuda/>} />
        <Route path='/contacto' element= {<Contacto/>} />
        <Route path="/producto/:id" element= {<PaginaProducto/>} />
        <Route path='/dashboard' element= {<Dashboard/>}> 
          <Route path='actualizarprecios' element= {<ActualizarPrecios/>} />
          <Route path='actualizarcategorias' element= {<CategoriasPanel />} />
          <Route path='actualizarproveedores' element= {<ProveedoresPanel />} />
          <Route path='actualizarproductos' element= {<ProductsList />} />
        </Route>
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
