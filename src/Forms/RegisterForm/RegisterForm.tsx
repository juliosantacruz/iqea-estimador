/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import "./RegisterForm.scss";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/RoutesDirectory";
import { setRegisterServer } from "../../services/fetchData";

// import InputComponent from "../../components/InputComponent";

export type SignInForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const formTest = {
  username: "juanxD99",
  email: "juan@test.com",
  password: "asdf1234",
  confirmPassword: "asdf1234",
};

// Esta funcion registra a un Usuario nuevo, no requiere Auth
export async function RegisterFormNewUser(userData: any) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const raw = JSON.stringify(userData);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "cors",
      redirect: "follow",
    };

    const res = await fetch(
      `http://127.0.0.1:8000/estimador/api/register/`,
      requestOptions as any
    )
      .then((res) => res.text())
      .then((result) => result)
      .catch((error) => console.log(error));

    return JSON.parse(res as string);
  } catch (error) {
    console.error("Error during postNewUser:", error);

    throw error;
  }
}

export default function RegisterForm() {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const leSubmit = handleSubmit(async (data: any) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    try {
      // Modificar la estructura del objeto antes de enviarlo
      const userData = {
        username: data.username,
        password: data.password,
        email: data.email,
        iqea_user: {
          name: data.name,
          last_name: data.lastname,
          email: data.email,
          phone: data.phone,
          company: data.company,
          isAdmin: false, // o false según tus necesidades
        },
      };
      const register = await setRegisterServer(userData)
      console.log(register)

      if((register as any).ok){
        navigate(RoutesDirectory.HOME);

      }
    } catch (error) {
      console.error("Error during postNewUser:", error);

      throw error;
    }
  });

  return (
    <form action="" className="registerForm" onSubmit={leSubmit}>
      <fieldset title="useData">
        <div className="formRowRegister">
          <InputField
            name="username"
            label="Usuario"
            type="text"
            register={register}
          />
        </div>{" "}
        <div className="formRowRegister">
          <InputField
            name="name"
            label="Nombre"
            type="text"
            register={register}
          />
        </div>{" "}
        <div className="formRowRegister">
          <InputField
            name="lastname"
            label="Apeido"
            type="text"
            register={register}
          />
        </div>
        <div className="formRowRegister">
          <InputField
            name="email"
            label="Correo Electronico"
            type="email"
            register={register}
          />
        </div>
        <div className="formRowRegister">
          <InputField
            name="company"
            label="Empresa"
            type="text"
            register={register}
          />
        </div>
        <div className="formRowRegister">
          <InputField
            name="phone"
            label="Telefono de Contacto"
            type="text"
            register={register}
          />
        </div>
        <div className="formRowRegister">
          <InputField
            name="password"
            label="Contraseña"
            type="password"
            register={register}
          />
        </div>
        <div className="formRowRegister">
          <InputField
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            register={register}
          />
        </div>
      </fieldset>
      {error ? <h4>{(error as any).message}</h4> : null}
      <div className="forgotPassword">
        <a href={"#"}>Olvidaste tu contrasenia..?</a>
      </div>
      <div className="formBtn">
        <button type="submit">Continuar</button>
      </div>
      <div className="formNewUser">
        Ya tienes cuenta..?{" "}
        <Link to={RoutesDirectory.LOG_IN}>Inicia Sesion aqui..</Link>
      </div>
    </form>
  );
}
