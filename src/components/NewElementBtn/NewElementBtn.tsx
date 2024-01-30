import React, { useState } from "react";
import "./NewElementBtn.scss";
import CotizacionForm from "../../Forms/CotizacionForm/CotizacionForm";

export default function NewElementBtn() {
  const [viewForm, setViewForm] = useState(false);

  const handleAddBtn = () => {
    setViewForm(true);
  };
  return (
    <>
      <div className="addBtn">
        <button onClick={handleAddBtn}>+</button>
      </div>

      {viewForm && (
        <div className="formContainer">
          <CotizacionForm modal={{ viewForm, setViewForm }} />
        </div>
      )}
    </>
  );
}
