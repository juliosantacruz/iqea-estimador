/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import "./LogInForm.scss";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/userStore";
import { RoutesDirectory } from "../../routes/RoutesDirectory";
import { jwtDecode } from "jwt-decode";
import { setLogInServer } from "../../services/fetchData";
import { useState } from "react";

export type LogInForm = {
  username: string;
  email: string;
  password: string;
};

export default function LogInForm() {
  const isDev = import.meta.env.VITE_IS_DEV === "false" ? false : true;
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const { setTokens, setIsAuth, setUser } = useUserStore();
  const navigate = useNavigate();

  const leSubmit = handleSubmit(async (data: any) => {
    if (!isDev) {
      const response = await setLogInServer(data);
      if ((response as Response).status === 200) {
        const rawData = await (response as Response).json();
        const jwtData: any = jwtDecode(rawData.access);
        const userData = {
          userId: jwtData.user_id,
          username: jwtData.username,
          email: jwtData.email,
          company: jwtData.company,
          isAdmin: jwtData.isAdmin,
        };
        setError(false);
        setUser(userData);
        setTokens(rawData);
        setIsAuth(true);
        navigate(RoutesDirectory.HOME);
      } else {
        console.error("algo salio mal");
        setError(true);
      }
    }

    if (isDev) {
      if (data.username === "test" && data.password === "test") {
        const userData = {
          userId: "1",
          username: "test",
          email: "test@test.com",
          company: "Company",
          isAdmin: false,
        };
        const rawData = { access: "string", refresh: "string" };
        setError(false);
        setUser(userData);
        setTokens(rawData);
        setIsAuth(true);
        navigate(RoutesDirectory.HOME);
      } else {
        console.error("algo salio mal");
        setError(true);
      }
    }
  });

  return (
    <form action="" className="LogInForm" onSubmit={leSubmit}>
      <div className="formRow">
        <InputField
          name="username"
          label="Nombre de Usuario"
          type="text"
          register={register}
        />
      </div>
      <div className="formRow">
        <InputField
          name="password"
          label="Contraseña"
          type="password"
          register={register}
        />
      </div>
      {error && (
        <p className="loginError">
          {"-> Contraseña o usuario no coincide, por favor verifique"}
        </p>
      )}

      <div className="forgotPassword">
        <Link to={"#"}>Olvidaste tu contrasenia..?</Link>
      </div>
      <div className="formBtn">
        <button type="submit">Continuar</button>
      </div>
      <div className="formNewUser">
        No tienes cuenta..?{" "}
        <Link to={RoutesDirectory.SIGN_IN}>Registrate aqui..</Link>
      </div>
    </form>
  );
}
