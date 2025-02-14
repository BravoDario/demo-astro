import React, { useState, useMemo } from "react";
import { apiConfig } from "../../helper/apiConfig";

const Validador = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handler = async () => {
        const response = await fetch(`${apiConfig.endpoint}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const userRecord = await response.json();
            localStorage.setItem("token", JSON.stringify(userRecord));
            window.location.href = "/myausita";
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
        <div>
            <button onClick={getImages}>Get Images</button>
            <h1>Register</h1>
            <p>
                Already have an account? <a href="/signin">Sign in</a>
            </p>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handler}
            >
                Iniciar sesión
            </button>
        </div>
    );
};

export default Validador;
