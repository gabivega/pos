import React from 'react'
import { Link ,} from 'react-router-dom'

const DashboardBar = () => {
  return (
    // <!-- component -->
    <aside class="min-w-[150px] bg-[#1c212c] min-h-full h-screen flex flex-col items-center pt-5 pb-2 space-y-7">
    
        {/* <!-- menu items --> */}
        <div class="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
            
            <div class="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">Menu</div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative">
                    <div class="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to={"/"}><div class="bg-white/10 text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">                    
                    <svg class="h-5 w-5 !fill-red-500 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    </svg>    
                    <span class="font-QuicksandMedium">POS</span>
                </div></Link>
            </div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to={"actualizarproductos"}><div class="bg-white/10 text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">                    
                    <svg class="h-5 w-5 !fill-red-500 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    </svg>    
                    <span class="font-QuicksandMedium">Inventario</span>
                </div></Link>
            </div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to={"nuevoProducto"}><div class="bg-white/10 text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">                    
                    <svg class="h-5 w-5 !fill-red-500 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    </svg>    
                    <span class="font-QuicksandMedium">Carga Productos</span>
                </div></Link>
            </div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to="actualizarcategorias"> 
                    <div class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">
                    <svg class="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    </svg>
                    <span class="font-QuicksandMedium">Categorias</span>
                </div>
                </Link>
            </div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to="actualizarproveedores">
                    <div class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">
                    <svg class="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>    
                    <span class="font-QuicksandMedium">Proveedores</span>
                </div>
                </Link>
            </div>    
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to="actualizarprecios">
                <div class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">
                    <svg class="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>    
                    <span class="font-QuicksandMedium">Actualizar Precios</span>
                </div>
                </Link>
            </div>
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to="clientes">
                <div class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">
                    <svg class="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>    
                    <span class="font-QuicksandMedium">Clientes</span>
                </div>
                </Link>
            </div>
            <div class="w-full flex items-center gap-x-1.5 group select-none">
                <div class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <Link to="/comprobantes">
                <div class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm" href="#">
                    <svg class="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>    
                    <span class="font-QuicksandMedium">Comprobantes</span>
                </div>
                </Link>
            </div>
        </div>    
    </aside>
  )
}

export default DashboardBar