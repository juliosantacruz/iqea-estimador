import { useState } from "react";
import axios from "axios";
import "./PreregistroForm.scss";
const API_URL = import.meta.env.VITE_API_URL;
const PreregistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    perfil: "",
    puesto: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await postProjectForm(formData);
      alert("Registro exitoso!");
      setFormData({ nombre: "", empresa: "", correo: "", telefono: "", perfil: "", puesto: "" });
    } catch (error) {
      console.error("Error en el registro", error);
      alert("Error en el registro");
    }
  };

  return (
    <form className="preregistro-form" onSubmit={handleSubmit}>
      <label>Nombre completo: <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /></label>
      <label>Empresa: <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required /></label>
      <label>Correo: <input type="email" name="correo" value={formData.correo} onChange={handleChange} required /></label>
      <label>Teléfono: <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required /></label>
      <label>Perfil LinkedIn: <input type="text" name="perfil" value={formData.perfil} onChange={handleChange} required /></label>
      <label>Puesto en la organizacion: <input type="text" name="puesto" value={formData.puesto} onChange={handleChange} required /></label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default PreregistroForm;


export async function postProjectForm(data:any) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API_URL}/registro-estimadors`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { data },
  };

  try {
    const response = await axios.request(config);
    console.log(response);
    return response; // Asegura que la función devuelve la respuesta
  } catch (error) {
    console.log(error);
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
}
