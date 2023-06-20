import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal--overlay">
      <div className="modal--container">
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="btn-grp">
          <button className="confirm" onClick={onConfirm}>Confirm</button>
          <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
