import React from "react";
import "../styles/CommonDropDown.css";

export default function CommonDropDown({
    label,
    options = [],
    value,
    onChange,
    name,
    labelcolor,
    isLogWorkout,
    disabled
}) {
    return (
        <div style={isLogWorkout && { width: "35%" }} className="SelectContainer">
            {label && (
                <label
                    style={labelcolor ? { color: labelcolor } : {}}
                    className="SelectLabel"
                >
                    {label}
                </label>
            )}

            <select
                className="CustomSelect"
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
            >
                <option value="" disabled>
                    Select an option
                </option>

                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        <span style={{color:'black'}}>
                        {option.label}

                        </span>
                    </option>
                ))}
            </select>
        </div>
    );
}
