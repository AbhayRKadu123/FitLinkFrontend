import React, { useEffect } from "react";

export default function Notification({ type, message, onClose, onConfirm }) {
  useEffect(() => {
    // Auto-close only for success and error notifications
    if (type !== "confirmation") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, type]);

  const getBackground = () => {
    switch (type) {
      case "success":
        return "linear-gradient(45deg, #4caf50, #66bb6a)";
      case "error":
        return "linear-gradient(45deg, #f44336, #e57373)";
      case "confirmation":
        return "linear-gradient(45deg, #ffb300, #ffca28)";
      default:
        return "gray";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "confirmation":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const styles = {
    container: {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -10%)",

  padding: "1rem 1.5rem",
  borderRadius: "10px",
  color: "white",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  zIndex: 1000,
  width: "auto",
  minWidth: "250px",
  background: getBackground(),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  animation: "slideIn 0.3s ease-out",
}
,
    icon: {
      fontWeight: "bold",
      fontSize: "1.4rem",
    },
    message: {
      flexGrow: 1,
      color:'black'
    },
    btnContainer: {
      display: "flex",
      gap: "0.5rem",
    },
    button: {
      background: "white",
      color: "#333",
      border: "none",
      borderRadius: "5px",
      padding: "0.3rem 0.7rem",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.icon}>{getIcon()}</span>
      <span style={styles.message}>{message}</span>

      {type === "confirmation" ? (
        <div style={styles.btnContainer}>
          <button
            style={{ ...styles.button, background: "#4caf50", color: "white" }}
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            style={{ ...styles.button, background: "#f44336", color: "white" }}
            onClick={onClose}
          >
            No
          </button>
        </div>
      ) : (
        <button style={styles.button} onClick={onClose}>
          ✖
        </button>
      )}
    </div>
  );
}

// Add smooth animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`;
document.head.appendChild(style);
