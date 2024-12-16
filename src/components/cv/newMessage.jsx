//componente de react para enviar un mensaje a la base de datos

import React from "react";
import { useState } from "react";

const NewMessage = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { register, handleSubmit, formState } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setMessage("");
        setError("");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Escribe tu mensaje aquí"
                    {...register("message")}
                />
                <button type="submit">Enviar</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default NewMessage;