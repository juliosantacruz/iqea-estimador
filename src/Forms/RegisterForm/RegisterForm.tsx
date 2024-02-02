/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import "./RegisterForm.scss";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";

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
export async function RegisterFormNewUser(
  userData: any,
  setError: any,
  setLoading: any
) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
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
      `http://localhost:1337/api/auth/local/register`,
      requestOptions as any
    )
      .then((res) => res.text())
      .then((result) => result)
      .catch((error) => setError(error));

    return JSON.parse(res as string);
  } catch (error) {
    console.error("Error during postNewUser:", error);
    setError(error);
    setLoading(false);
    throw error;
  }
}

export default function RegisterForm({
  setLoading,
  setToken,
  setIsRegister,
}: any) {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const leSubmit = handleSubmit(async (data: any) => {
    console.log(data);
  });

  return (
    <form action="" className="signInForm" onSubmit={leSubmit}>
      <fieldset title="useData">
        <div className="formRow">
          <InputField
            name="username"
            label="Usuario"
            type="text"
            register={register}
          />
        </div> <div className="formRow">
          <InputField
            name="name"
            label="Nombre"
            type="text"
            register={register}

          />
        </div> <div className="formRow">
          <InputField
            name="lastname"
            label="Apeido"
            type="text"
            register={register}

          />
        </div>
        <div className="formRow">
          <InputField
            name="email"
            label="Correo Electronico"
            type="email"
            register={register}
          />
        </div>

        <div className="formRow">
          <InputField
            name="company"
            label="Empresa"
            type="text"
            register={register}

          />
        </div>
        <div className="formRow">
          <InputField
            name="phone"
            label="Telefono de Contacto"
            type="text"
            register={register}

          />
        </div><div className="formRow">
          <InputField
            name="password"
            label="Contraseña"
            type="password"
            register={register}
          />
        </div>
        <div className="formRow">
          <InputField
            name="password"
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
        Ya tienes cuenta..? <a href={"/login"}>Inicia Sesion aqui..</a>
      </div>
    </form>
  );
}
