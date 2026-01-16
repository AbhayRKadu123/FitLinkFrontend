const TextArea = ({ label, value, onChange, maxLength = 200 }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
      maxWidth: "420px",
      fontFamily: "Inter, Arial, sans-serif",
    //   backgroundColor:"white"
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
    },
    textarea: {
      minHeight: "110px",
      resize: "vertical",
      padding: "12px",
      fontSize: "14px",
      borderRadius: "10px",
      border: "1.5px solid #d1d5db",
      outline: "none",
      transition: "all 0.2s ease",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      backgroundColor:"white",
      color:"black"

    },
    textareaFocus: {
      border: "1.5px solid #2563eb",
      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
    },
    counter: {
      alignSelf: "flex-end",
      fontSize: "12px",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>

      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder="Type here..."
        style={styles.textarea}
        onFocus={(e) =>
          Object.assign(e.target.style, styles.textareaFocus)
        }
        onBlur={(e) =>
          Object.assign(e.target.style, {
            border: styles.textarea.border,
            boxShadow: styles.textarea.boxShadow,
          })
        }
      />

      <span style={styles.counter}>
        {value.length} / {maxLength}
      </span>
    </div>
  );
};

export default TextArea;
