/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/estimador/api/";

export const getAllProjects = async () => {
  try {
    const res = axios.get(`${baseUrl}v1/projects/`);
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
};

export const setLogInServer = async (userData: {
  username: string;
  password: string;
}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    username: userData.username,
    password: userData.password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}token/`, requestOptions as any).catch(
    (error) => console.log("error", error)
  );

  return response;
};

type NewUserType = {
  username: string;
  password: string;
  email: string;
  iqea_user: {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    isAdmin: boolean;
  };
};
export const setRegisterServer = async (newUserData: NewUserType) => {
  const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(newUserData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = fetch(`${baseUrl}register/`, requestOptions as any)
        .then((response) => response)
        // .then((response) => response.text())
        // .then((result) => {return result})
        .catch((error) => console.log("error", error));
        return response
};
