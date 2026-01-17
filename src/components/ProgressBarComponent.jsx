import React from "react";
import "../styles/ProgressBar.css";

export default function ProgressBar({ value = 20, label,HidePersentage }) {
  // Ensure value stays between 0 and 100
  const progress = Math.min(Math.max(value, 0), 100);

  return (
    <div className="progress-container">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {!HidePersentage&&<span className="progress-percentage">{progress}%</span>}
    </div>
  );
}
