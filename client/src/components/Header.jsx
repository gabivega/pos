import React from "react";
import logoBig from "../assets/logo.png";
import logoSmall from "../assets/logoSmall.jpg";
import { FaUserAlt, FaSearch } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineExpandMore, MdMenu } from "react-icons/md";
import useMediaQuery from "../hooks/useMediaQuery";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/state";
import SearchBar from "./SearchBar";

const Header = () => {
  const isBigScreen = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = useMediaQuery("(max-width:767px)");
  const [showMenuCuenta, setShowMenuCuenta] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
 // const cart = useSelector((state) => state.cart);
  // const cartItems = useSelector((state) => state.cart)
  // const cartLength = cartItems.cartLength

  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenus);
  }, []);

  const handleClickOutsideMenus = (e) => {
    if (!userMenuRef?.current?.contains(e.target)) {
      setShowMenuCuenta(false);
    }
    if (!categoriesMenuRef?.current?.contains(e.target)) {
      setShowCategories(false);
    }
  };

  return (
    <header className="h-[100px] w-full bg-blue px-4 sm:px-auto md:px-10 ">
      {/* --**---**---**-- DESKTOP VERSION --**---**---**--*/}

      {/* LOGO SECTION  */}
      {isBigScreen ? (
        <div className="flex justify-between items-center py-4">
          <div className="">
            <p className="text-white text-xl text-center">POS</p>
            {/* <Link to="/" className="h-[50px]">
              <img
                src={
                  logoBig}
                alt=""
                className="w-[150px]"
              />
            </Link> */}
          </div>

          {/* SEARCH - MIDLE SECTION */}
          {/* <div className="flex justify-around flex-col h-[-100%] basis-[50%]"> */}
          {/* <SearchBar /> */}

          {/* <div className="flex justify-between gap-4 w-[50%] my-2">
              <div
                className="flex items-center hover:cursor-pointer"
                onClick={() => setShowCategories(!showCategories)}
                ref={categoriesMenuRef}
              >
                <p className="text-white">Categorías </p>
                <span>
                  <MdOutlineExpandMore className="text-white" />
                </span>
              </div>
              {showCategories && (
                <div className="absolute bg-white p-2 mt-6 rounded shadow drop-shadow-md z-10">
                  <Link to="/categorias">
                    <p className="whitespace-nowrap cursor-pointer hover:underline">
                      Categorias
                    </p>
                  </Link>
                </div>
              )}
              <Link to={"/ofertas"} className="text-white">
                Ofertas
              </Link>
              <Link to={"/pos"} className="text-white">
                POS
              </Link>
              <Link to={"/contacto"} className="text-white">
                Contacto
              </Link>
            </div>
          </div> */}

          {/* ACCOUNT-CART SECTION */}
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row" ref={userMenuRef}>
                <Link
                  className="flex flex-row gap-1"
                  onClick={() => setShowMenuCuenta(!showMenuCuenta)}
                >
                  <FaUserAlt className=" text-xl text-white" />
                  <p className="text-white">{user ? "Mi cuenta" : "Acceder"}</p>
                </Link>
                {showMenuCuenta && (
                  <div className="absolute bg-white p-2 rounded mt-6 shadow drop-shadow-md z-10">
                    {user ? (
                      <>
                        <Link
                          to="/micuenta"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Perfil
                          </p>
                        </Link>
                        <Link
                          to="/dashboard/actualizarproductos"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Dashboard
                          </p>
                        </Link>
                        <p
                          className="whitespace-nowrap cursor-pointer"
                          onClick={() => {
                            dispatch(setLogout());
                            setShowCategories(false);
                            navigate("/");
                          }}
                        >
                          Cerrar Sesión
                        </p>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Iniciar Sesión
                          </p>
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Crear Cuenta
                          </p>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* {user ? 
              <div className="text-white"><Link to={"/nuevoproducto"}>Crear Producto</Link></div> : 
              <div className="text-white"><Link to={"/login"}>Login para vender</Link></div> } */}
          </div>
        </div>
      ) : (
        //--**---**---**-- MOBILE VERSION --**---**---**--

        <div className="flex gap-4 h-[100px]">

          {/* ACCOUNT-CART SECTION */}
          <div className="flex items-center gap-2 h-full basis-1/8 mx-auto">
            <div className="flex justify-around gap-2 h-[40px] mx-auto ">
              <div className="flex items-center " ref={userMenuRef}>
                <Link
                  //                  to={isLoggedIn ? "/micuenta" : "/login"}
                  onClick={() => setShowMenuCuenta(!showMenuCuenta)}
                  className=""
                >
                  <FaUserAlt className="text-white" size={24} />
                </Link>
                {showMenuCuenta && (
                  <div className="absolute bg-white p-2 mt-10 rounded shadow drop-shadow-md z-20 right-4 top-6">
                    {user ? (
                      <>
                        <Link
                          to="/micuenta"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Perfil
                          </p>
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Dashboard
                          </p>
                        </Link>
                        <p
                          className="whitespace-nowrap cursor-pointer"
                          onClick={() => {
                            dispatch(setLogout());
                            setShowCategories(false);
                            navigate("/");
                          }}
                        >
                          Cerrar Sesión
                        </p>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Iniciar Sesión
                          </p>
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => {
                            setShowMenuCuenta(false);
                          }}
                        >
                          <p className="whitespace-nowrap cursor-pointer hover:underline">
                            Crear Cuenta
                          </p>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
