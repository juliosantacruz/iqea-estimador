import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/estimador/api/v1/";

export const getAllProjects = async () => {
  try {
    const res = axios.get(`${baseUrl}projects/`);
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
};
