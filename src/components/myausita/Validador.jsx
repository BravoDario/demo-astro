import React, { useState } from 'react';

const Validador = () => {
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsValid(validatePassword(newPassword));
    };

    const validatePassword = (password) => {
        // Aquí puedes implementar tu lógica de validación de contraseña
        // Por ejemplo, puedes verificar si la contraseña tiene al menos 8 caracteres
        return password.length >= 8;
    };

    const handler = async () => {
        const formData = new FormData();
        formData.append("name", "Darío Bravo");
        formData.append("email", "dario.bravo@gmail.com");
        formData.append("password", "123456789")

        try {
            const response = await fetch("apis/register", {
                params: "sí hay",
                method: "POST"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);

        };
    }


    return (
        <div>
            <h1>Register</h1>
            <p>Already have an account? <a href="/signin">Sign in</a></p>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="email" >Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

                onClick={handler}
            >
                Register
            </button>
        </div>
    );
};

export default Validador;