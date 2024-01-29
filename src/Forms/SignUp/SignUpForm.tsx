"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import "./SignUpForms.scss";
// import InputComponent from "@/components/InputComponent";
import { signIn } from "next-auth/react";

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
export async function postNewUser(
  userData: any,
  setError: any,
  setLoading: any
) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

export default function SignInForm({
  setLoading,
  setToken,
  setIsRegister,
}: any) {
  const [formData, setFormData] = useState<SignInForm>(formTest);
  const [error, setError] = useState();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setIsRegister(true);
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const jwtToken = await postNewUser(userData, setError, setLoading);

    if (jwtToken.error) {
      setError(jwtToken.error);
      setIsRegister(false);
    }

    setToken(jwtToken);
    // console.log(jwtToken)
    await signInSession();
  };

  const signInSession = async () => {
    await signIn("credentials", {
      identifier: formData.username,
      password: formData.password,
      redirect: false,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setLoading(false);
  };

  const handleChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  return (
    <form
      action=""
      className="signInForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      {/* <fieldset title="useData">
        <div className="formRow">
          <InputComponent
            name="username"
            label="Usuario"
            type="text"
            value={formData.username}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="email"
            label="Correo Electronico"
            type="email"
            value={formData.email}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="password"
            label="Confirmar Contraseña"
            type="password"
            value={formData.confirmPassword}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
      </fieldset> */}
      {error ? <h4>{(error as any).message}</h4> : null}
      <div className="forgotPassword">
        <Link href={"#"}>Olvidaste tu contrasenia..?</Link>
      </div>
      <div className="formBtn">
        <button type="submit">Continuar</button>
      </div>
      <div className="formNewUser">
        Ya tienes cuenta..? <Link href={"/login"}>Inicia Sesion aqui..</Link>
      </div>
    </form>
  );
}

