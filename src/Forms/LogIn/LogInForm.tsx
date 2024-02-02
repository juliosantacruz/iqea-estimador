/* eslint-disable @typescript-eslint/no-explicit-any */

import {  useNavigate } from "react-router-dom";
import "./LogInForm.scss";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/userStore";
import { RoutesDirectory } from "../../routes/RoutesDirectory";
import { jwtDecode } from "jwt-decode";


export type LogInForm = {
  username: string;
  email: string;
  password: string;
};

// const formTest = {
//   username: "",
//   email: "",
//   password: "",
// };

export default function LogInForm() {
  const { register, handleSubmit } = useForm();
  const {setTokens, setIsAuth, setUser}=useUserStore()
  const navigate = useNavigate();

  const leSubmit = handleSubmit(async (data: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: data.username,
      password: data.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://127.0.0.1:8000/estimador/api/token/",
      requestOptions as any
    ).catch((error) => console.log("error", error));
    if ((response as Response).status === 200) {
      const rawData = await (response as Response).json();
      const jwtData:any=jwtDecode(rawData.access)

      const userData={
        userId:jwtData.user_id,
        username:jwtData.username,
        email:jwtData.email,
        company:jwtData.company,
        isAdmin:jwtData.isAdmin,
      }
      setUser(userData)
      setTokens(rawData)
      setIsAuth(true)

      navigate(RoutesDirectory.HOME);
    } else {
      console.error("algo salio mal");
    }
  });

  return (
    <form action="" className="signInForm" onSubmit={leSubmit}>
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

      <div className="forgotPassword">
        {/* <Link href={"#"}>Olvidaste tu contrasenia..?</Link> */}
      </div>
      <div className="formBtn">
        <button type="submit">Continuar</button>
      </div>
      <div className="formNewUser">
        No tienes cuenta..? <a href={"/signup"}>Registrate aqui..</a>
      </div>
    </form>
  );
}
