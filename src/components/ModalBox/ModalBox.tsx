"use client"
import React from "react";
import  "./ModalBox.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBox: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={"modal-overlay"}>
      <div className={"modal-container"} onClick={(e) => e.stopPropagation()}>
        <button className={"modal-close"} onClick={onClose}>
          ✖
        </button>
        <div className={"modal-content"}>
        {React.Children.map(children, (child) => {
            // Verificamos si el child es un ReactElement antes de clonar
            if (React.isValidElement<{ onClose?: () => void }>(child)) {
              return React.cloneElement(child, { onClose });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
