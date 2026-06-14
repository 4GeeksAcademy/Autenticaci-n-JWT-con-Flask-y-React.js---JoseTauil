import React from "react";
import { Navigate } from "react-router-dom";

export const Private = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Área privada 🔐</h1>
      <p>Solo usuarios autenticados pueden ver esto</p>
    </div>
  );
};