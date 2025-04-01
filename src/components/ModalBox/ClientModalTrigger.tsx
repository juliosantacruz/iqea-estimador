import { useEffect, useState } from "react";
import Modal from "./ModalBox";
import PreregistroForm from "../../Forms/PreRegisterForm";
// import FormProject from "../FormProject/FormProject";

export default function ClientModalTrigger({label,data}:any) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" ,  }}>
        <button style={{background:"none", color:"black",fontWeight:"bold", fontSize:"1rem" }} onClick={() => setIsOpen(true)}>{label}</button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-header" style={{marginBottom:"2rem"}}>
          <h2>Registro de Usuario</h2>
          <p>Se de los primeros en registrarte en esta aplicacion</p>
          </div>

        <PreregistroForm/>
      </Modal>
    </div>
  );
}
