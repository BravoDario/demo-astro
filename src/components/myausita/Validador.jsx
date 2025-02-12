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

    return (
        <div>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            {isValid ? <p>Contraseña válida</p> : <p>Contraseña inválida</p>}
        </div>
    );
};

export default Validador;