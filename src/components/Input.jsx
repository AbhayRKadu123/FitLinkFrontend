import React from "react";
import "../styles/Input.css"

export default function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    name,
    labelcolor,
    isLogWorkout,key
}) {
    return (
        <div style={isLogWorkout&&{width:"35%"}} className="InputContainer">
            {label && <label style={labelcolor?{color:labelcolor}:{}} className="InputLabel">{label}</label>}
            <input
                className="CustomInput"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                key={key}
                
                
                
            />
        </div>
    );
}
