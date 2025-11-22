import React, { useState } from "react";
import "../styles/CustomTourGuide.css"

export default function TopRightFloatingRobot({ bannerText = "Enter Exercise Title And for enter name of exercise u want to perform in it and click add exercise and once done click save and next" }) {
const [expanded, setExpanded] = useState(true);

return (
<div
style={{
position: "fixed",
top: "20px",
right: "40%",
    transform: "translate(-50%, -50%)", // move back by half of its own width & height

zIndex: 9999,
display: "flex",
flexDirection: "column",
alignItems: "center",
animation: "float 3s ease-in-out infinite",
maxWidth: "220px"
}}
>
{/* Robot */}
<svg
width="80"
height="120"
viewBox="0 0 80 120"
xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
style={{ cursor: "pointer" }}
onClick={() => setExpanded(!expanded)}
> <rect x="20" y="40" width="40" height="50" fill="#00ffff" rx="5" stroke="#fff" strokeWidth="2" /> <rect x="25" y="10" width="30" height="30" fill="#ff00ff" rx="5" stroke="#fff" strokeWidth="2" /> <circle cx="35" cy="25" r="3" fill="#fff" /> <circle cx="55" cy="25" r="3" fill="#fff" /> <line x1="20" y1="50" x2="0" y2="70" stroke="#00ffcc" strokeWidth="5" /> <line x1="60" y1="50" x2="80" y2="70" stroke="#00ffcc" strokeWidth="5" /> <line x1="20" y1="60" x2="60" y2="60" stroke="#ffcc00" strokeWidth="2" /> </svg>


  {/* Toggle button */}
  <button
    onClick={() => setExpanded(!expanded)}
    style={{
      marginTop: "5px",
      padding: "2px 6px",
      fontSize: "0.7rem",
      borderRadius: "4px",
      border: "none",
      background: "#8e44ad",
      color: "#fff",
      cursor: "pointer"
    }}
  >
    {expanded ? "Minimise" : "Expand"}
  </button>

  {/* Banner (expandable with smooth transition) */}
  <div
    style={{
      marginTop: "5px",
      padding: expanded ? "8px 12px" : "0px",
      background: "linear-gradient(90deg, #ff00ff, #00ffff)",
      color: "#000",
      fontWeight: "bold",
      borderRadius: "6px",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(255,255,255,0.7)",
      maxHeight: expanded ? "150px" : "0",
      overflowY: "auto",
      transition: "all 0.3s ease"
    }}
    className="RobotBanner"
  >
    {expanded && bannerText}
    
    
  </div>

  {/* Floating animation */}
  <style>
    {`
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `}
  </style>
</div>


);
}
