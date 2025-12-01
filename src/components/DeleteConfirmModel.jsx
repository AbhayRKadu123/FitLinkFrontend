// DeleteConfirmModal.jsx
import React from "react";
import "../styles/DeleteConfirmModal.css"

export default function DeleteConfirmModal({Title, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; // don't render if not open

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3 style={{color:'black'}}>{Title}</h3>
        <div className="modalActions">
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
          <button className="confirmBtn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
