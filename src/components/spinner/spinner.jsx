import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner({ loading = true, color = "#4F46E5", size = 80 }) {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(4px)",
    zIndex: 9999,
  };

  return (
    loading && (
      <div style={overlayStyle}>
        <ClipLoader
          color={color}
          loading={loading}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  );
}

export default Spinner;
