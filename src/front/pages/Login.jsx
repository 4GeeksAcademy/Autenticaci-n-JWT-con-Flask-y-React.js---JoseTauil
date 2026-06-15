import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await resp.json();

      // 🔍 DEBUG (IMPORTANTE PARA SABER QUÉ LLEGA)
      console.log("RESPUESTA BACKEND:", data);

      // ❌ ERROR DE LOGIN
      if (!resp.ok) {
        alert(data.msg || "Error en login");
        return;
      }

      // 🚨 VALIDACIÓN DEL TOKEN
      if (!data.token) {
        console.error("❌ No se recibió token del backend");
        alert("Error: el servidor no devolvió token");
        return;
      }

      // 🔐 GUARDAR TOKEN
      sessionStorage.setItem("token", data.token);

      // ✔ CONFIRMACIÓN
      console.log("TOKEN GUARDADO:", sessionStorage.getItem("token"));

      // 🚀 REDIRECCIÓN
      navigate("/private");

    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};