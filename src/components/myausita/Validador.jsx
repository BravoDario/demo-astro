import { useState } from "react";
import { apiConfig } from "../../helper/apiConfig";

const Validador = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch(`${apiConfig.endpoint}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const userRecord = await response.json();
            localStorage.setItem("token", userRecord.token);
            window.location.href = "/";
        } else {
            const errorMessage = await response.text();
            console.error("Login failed:", errorMessage);
        }
    };

    const getImages = async () => {
        const response = await fetch(`${apiConfig.endpoint}/images`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const images = await response.json();
            console.log("Images:", images);
        } else {
            const errorMessage = await response.text();
            console.error("Failed to get images:", errorMessage);
        }
    };

    return (
        <div className="space-y-6">
            <div className="input-field relative">
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200"
                    placeholder="Correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fas fa-envelope absolute right-3 top-3 text-white"></i>
            </div>
            <div className="input-field relative">
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition duration-200"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fas fa-lock absolute right-3 top-3 text-white"></i>
            </div>
            <button
                type="submit"
                className="bg-white text-gray-700 w-full font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105"
                onClick={handleLogin}
            >
                Iniciar sesión
            </button>
        </div>
    );
};

export default Validador;
