import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const Signup = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isDuplicatedMail, setIsDuplicatedMail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BASEURL;

  const setInitialState = () => {
    setIsAccountCreated(false);
    setIsPasswordMatch(false);
    setIsPasswordShort(false);
    setIsDuplicatedMail(false);
    setIsRegisterError(false);
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInitialState();
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInitialState();
    if (data.password.length < 8) {
      setIsPasswordShort(true);
      return;
    }
    if (data.password !== data.confirmPassword) {
      setIsPasswordMatch(true);
      return;
    }
    setIsLoading(true);
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const register = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (register.status === 201) {
        const response = await register.json();
        //   console.log(response);
        setIsAccountCreated(true);
        data.email = "";
        data.password = "";
        data.confirmPassword = "";
      } else {
        // console.log(response);
        throw new Error(register.status);
      }
    } catch (error) {
      console.log(error);
      if (error.message == 409) {
        setIsDuplicatedMail(true);
      } else setIsRegisterError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center justify-between bg-slate-200 m-auto max-w-sm rounded-md">
        <div>
          <h1 className="text-2xl text-blue font-bold mt-2">Crear Cuenta</h1>
        </div>
        {isLoading && <Spinner />}
        {isAccountCreated && <div>CUENTA CREADA</div>}

        {isRegisterError && <div>ERROR INTENTE NUEVAMENTE</div>}
        <form className="flex flex-col items-center gap-2 w-[100%] p-4">
          <div className="flex flex-col items-start">
            <label className="font-semibold">Email</label>
            <input
              required
              type="email"
              placeholder="example@example.com"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="rounded p-2 focus-within:outline-blue w-[220px]"
            />
          </div>
          {/* ERROR MAIL YA REGISTRADO */}
          {isDuplicatedMail && (
            <div>
              <p className="text-red-500  font-semibold ">Mail ya registrado</p>
              <p
                onClick={() => navigate("/login")}
                className="hover:cursor-pointer font-semibold text-blue"
              >
                ¿Iniciar Sesión?
              </p>
            </div>
          )}
          <div className="flex flex-col items-start">
            <label className="font-semibold">Password</label>
            <div className="flex rounded focus-within:outline bg-white focus-within:outline-blue p-2 w-[220px] ">
              <input
                required
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                className="rounded border-none outline-none"
              />
              <span
                className="bg-white p-1 hover:cursor-pointer"
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <FaEye className="text-slate-600" />
                ) : (
                  <FaEyeSlash className="text-slate-600" />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <label className="font-semibold">Confirmar Password: </label>
            <div className="flex rounded focus-within:outline bg-white focus-within:outline-blue p-2 w-[220px] ">
              <input
                required
                type={isConfirmPasswordHidden ? "password" : "text"}
                placeholder="Confirmar Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className="rounded border-none outline-none"
              />
              <span
                className="bg-white p-1 hover:cursor-pointer"
                onClick={() =>
                  setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
              >
                {isConfirmPasswordHidden ? (
                  <FaEye className="text-slate-600" />
                ) : (
                  <FaEyeSlash className="text-slate-600" />
                )}
              </span>
            </div>
            {isPasswordMatch ? (
              <span className="text-red-500 text-sm">
                Password no coinciden!
              </span>
            ) : (
              ""
            )}
            {isPasswordShort ? (
              <span className="text-red-500 text-sm">
                Debe Tener al menos 8 caracteres
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="p-2">
            <button
              onClick={handleSubmit}
              className="bg-blue text-white font-semibold p-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex mb-3">
          <p>
            ¿Ya tenes cuenta?{" "}
            <Link to="/login" className="text-blue font-semibold">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
