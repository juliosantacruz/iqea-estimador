"use client";
// import React, {  useState } from "react";
import "./LogInForm.scss";
import InputField from "../../components/InputField/InputField";
// import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
// import { useUserStore } from "../../store/userStore";

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

// const users = [
//   {
//     username: "arturo",
//     password: "iqea2024",
//     name: "arturo chavez",
//     email: "arturo@iqea.mx",
//     company: "IQEA",
//     jwtToken: "jwtTOken_de_prueba",
//     isAdmin: true,
//   },
//   {
//     username: "julio",
//     password: "iqea2024",
//     name: "julio santacruz",
//     email: "cto@iqea.mx",
//     company: "IQEA",
//     jwtToken: "jwtTOken_de_prueba",
//     isAdmin: true,
//   },
// ]

export default function LogInForm() {
  const { register } = useForm();

  // useEffect(()=>{
  //   if(isAuth){
  //     router.push("/");
  //   }
  // },[])

  return (
    <form action="" className="signInForm">
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
