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
      const response = await axios.post(`${API_URL}/registro-estimadors`, {
        data: formData
      });
      alert("Registro exitoso!");
      setFormData({ nombre: "", empresa: "", correo: "", telefono: "", perfil: "", puesto: "" });
    } catch (error) {
      console.error("Error en el registro", error);
      alert("Error en el registro");
    }
  };

  return (
    <form className="preregistro-form" onSubmit={handleSubmit}>
      <label>Nombre: <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /></label>
      <label>Empresa: <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required /></label>
      <label>Correo: <input type="email" name="correo" value={formData.correo} onChange={handleChange} required /></label>
      <label>Teléfono: <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required /></label>
      <label>Perfil: <input type="text" name="perfil" value={formData.perfil} onChange={handleChange} required /></label>
      <label>Puesto: <input type="text" name="puesto" value={formData.puesto} onChange={handleChange} required /></label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default PreregistroForm;
