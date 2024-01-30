/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import "./SignUpForms.scss";
// import InputComponent from "@/components/InputComponent";

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
