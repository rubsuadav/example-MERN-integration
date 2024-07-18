import { useState } from "react";

// local imports
import { API_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      localStorage.setItem("rol", "admin");
      localStorage.setItem("token", data.token);
      navigate(`/games/6693c1ddbaa4930a208750e0`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start pt-20 h-screen bg-primary-green">
      <div className="flex flex-col items-center justify-center py-4 px-32 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Inicia sesión</h1>
        <h3 className="text-sm text-gray-500 mb-8">
          ¿No tienes una cuenta?
          <Link to="/register" className="text-primary-green font-bold">
            Regístrate
          </Link>
        </h3>
        <form
          className="flex flex-col items-center justify-center p-4 w-full lg:w-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            onChange={(e) => handleChange(e)}
          />
          <div className="flex justify-center mt-4 w-full lg:w-3/4">
            <button
              type="submit"
              className="w-full p-2 bg-primary-green text-black font-bold rounded-lg"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
