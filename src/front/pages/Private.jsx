import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Private = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Área privada 🔐</h1>
      <p>Solo usuarios autenticados pueden ver esto</p>

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};