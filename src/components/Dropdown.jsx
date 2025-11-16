import { useState } from "react";

export default function Dropdown({ label, options, graphData, setGraphData }) {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={() => setOpen(!open)}>
        <span>{graphData || label}</span>
        <span
          style={{
            ...styles.icon,
            transform: open ? "rotate(180deg)" : "rotate(0deg)"
          }}
        >
          ▼
        </span>
      </div>

      {open && (
        <div style={styles.menu}>
          {options.map((opt, i) => (
            <div
              key={i}
              style={{
                ...styles.item,
                background: hoverIndex === i ? "#000" : "#fff",
                color: hoverIndex === i ? "#fff" : "#000",
              }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setGraphData(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "200px",
    fontFamily: "sans-serif",
    position: "relative",
  },
  header: {
    padding: "10px 12px",
    background: "#000",
    color: "#fff",
    borderRadius: "6px",
    border: "1px solid #000",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    transition: "0.2s",
  },
  menu: {
    marginTop: "6px",
    background: "#fff",
    borderRadius: "6px",
    border: "1px solid #000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  item: {
    padding: "10px 12px",
    cursor: "pointer",
    transition: "0.15s",
  },
};
