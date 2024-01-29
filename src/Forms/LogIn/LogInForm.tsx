"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./LogInForm.scss";
import InputField from "@/components/InputField/InputField";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserType } from "@/store/userStore";
import { useUserStore } from "@/store/userStore";
import { signIn } from "next-auth/react";

export type LogInForm = {
  username: string;
  email: string;
  password: string;
};

const formTest = {
  username: "",
  email: "",
  password: "",
};

const users = [
  {
    username: "arturo",
    password: "iqea2024",
    name: "arturo chavez",
    email: "arturo@iqea.mx",
    company: "IQEA",
    jwtToken: "jwtTOken_de_prueba",
    isAdmin: true,
  },
  {
    username: "julio",
    password: "iqea2024",
    name: "julio santacruz",
    email: "cto@iqea.mx",
    company: "IQEA",
    jwtToken: "jwtTOken_de_prueba",
    isAdmin: true,
  },
]

export default function LogInForm() {
  const [formData, setFormData] = useState<LogInForm>(formTest);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { setLogin, setIsAuth,isAuth } = useUserStore();


  // useEffect(()=>{
  //   if(isAuth){
  //     router.push("/");
  //   }
  // },[])

  const leSubmit =  handleSubmit(async (data: any) => {
    const username = data.username;
    const password = data.password;
    // console.log(username, password);

    // if (
    //   users.find((user) => user.username === username) &&
    //   users.find((user) => user.password === password)
    // ) {
    //   const loginUser = users.find((user) => user.username === username)
    //   console.log(loginUser)
    //   setLogin(loginUser as UserType);
    //   setIsAuth(true)
    //   router.push("/");
    // }


    try {
      const res = await signIn("credentials", {
        identifier: formData.username,
        password: formData.password,
        redirect: false,
      });
      // console.log(res)

      if ((res as any).ok) {


          router.push("/perfil");
        }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Puedes mostrar un mensaje de error al usuario aquí
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
        No tienes cuenta..? <Link href={"/signup"}>Registrate aqui..</Link>
      </div>
    </form>
  );
}
