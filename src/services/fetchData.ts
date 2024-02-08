/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/estimador/api/";

export const getAllProjects = async (token: string) => {
  try {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    const res = await axios.get(`${baseUrl}v1/projects/`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
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

export const verifyToken = async (leToken:string)=>{
  // console.log('verify token called')
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    token: leToken,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}token/verify/`, requestOptions as any)
  .then(response => response.text())
  .catch(
    (error) => console.log("error", error)
  );

  return JSON.parse(response as string);
}

export const setUpdateToken = async (refresToken:string)=>{
  console.log('update token called')
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    refresh: refresToken,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${baseUrl}token/refresh/`, requestOptions as any)
  .then(response => response.text())
  .then(result => {
    const data = JSON.parse(result)
    return {...data , status:200 }})
  .catch(
    (error) => console.log("error", error)
  );

  return response;
}

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
  return response;
};
