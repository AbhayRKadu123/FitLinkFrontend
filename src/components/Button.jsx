import React from "react";
import "../styles/Button.css";

export default function Button({
    isLoading,
    label,
    onClick,
    type = "button",
    variant = "primary", // "primary", "secondary", or "outline"
    disabled = false,
}) {
    return (
        <button
            className={`CustomButton ${variant}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            
        >
            {label}
        </button>
    );
}
