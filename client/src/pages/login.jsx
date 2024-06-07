import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/state";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassWordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setInitialState = () => {
    setIsWrongCredentials(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInitialState();
    setIsLoading(true);
    try {
      const loginData = {
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const loggedIn = await response.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.userObject,
            token: loggedIn.token,
          }),
        );
        navigate("/pos");
      } else throw new Error(response.status);
    } catch (error) {
      if (error.message == 400) {
        setIsWrongCredentials(true);
        console.log("error de autenticacion");
      } else console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-4 h-full my-auto">
      <div className="flex flex-col items-center justify-between bg-slate-200 m-auto max-w-sm rounded-md">
        <div>
          <h1 className="text-2xl text-blue font-bold mt-2">Iniciar Sesión</h1>
        </div>
        {isLoading && <Spinner />}
        <form className="flex flex-col items-center gap-2 w-[100%] p-4">
          <div className="flex flex-col items-start">
            <label className="font-semibold">Email</label>
            {isWrongCredentials ? (
              <span className="text-red-500 text-sm">
                Mail o Contraseña Incorrectos
              </span>
            ) : (
              ""
            )}
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@example.com"
              className="rounded p-2 focus-within:outline-blue w-[250px]"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="font-semibold">Password</label>
            <div className="flex rounded focus-within:outline bg-white focus-within:outline-blue p-2 w-[250px] justify-between">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type={isPassWordHidden ? "password" : "text"}
                placeholder="Password"
                className="rounded border-none outline-none"
              />
              <span
                className="bg-white p-1 hover:cursor-pointer max-w-[80%]"
                onClick={() => setIsPasswordHidden(!isPassWordHidden)}
              >
                {isPassWordHidden ? (
                  <FaEye className="text-slate-600 w-" />
                ) : (
                  <FaEyeSlash className="text-slate-600" />
                )}
              </span>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={handleSubmit}
              className="bg-blue text-white font-semibold p-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex mb-3">
          <p>
            ¿No tienes Cuenta?{" "}
            <Link to="/signup" className="text-blue font-semibold">
              Registrarme
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
