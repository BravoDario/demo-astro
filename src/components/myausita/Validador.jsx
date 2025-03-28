import { useEffect, useState } from "react";
import { apiConfig } from "../../helper/apiConfig";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tokenChecker } from "../../helper/tokenChecker";

const Validador = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLogin, setIsLogin] = useState(token ? true : false);

    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                const result = await tokenChecker(token);
                if (isLogin || result.isLogin) {
                    window.location.href = "/#";
                }
            }
        };

        setLoading(true);
        validateSession();
        setLoading(false);
    }, [token]);

    const errorList = {
        401: "Email o contraseña incorrectos.",
        404: "Usuario no encontrado.",
        400: "Ha ocurrido un error interno.",
        500: "Ha ocurrido un error interno.",
    };

    const handleLogin = async () => {
        setLoading(true);
        setMessage("");
        const response = await fetch(`${apiConfig.endpoint}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        setLoading(false);
        if (response.ok) {
            const userRecord = await response.json();
            localStorage.setItem("token", userRecord.token);
            localStorage.setItem("role", userRecord.role);
            window.location.href = "/";
        } else {
            const errorCode = response.status;
            setMessage(errorList[errorCode]);
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
        <>
            <div className="space-y-6">
                <div className="input-field relative">
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        className={"w-full px-4 py-3 rounded-lg bg-white bg-opacity-20  text-white placeholder-gray-200 transition duration-200"
                            + (message !== "" ? " border-red-500 border-2 " : "")
                        }
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
                        className={"w-full px-4 py-3 rounded-lg bg-white bg-opacity-20  text-white placeholder-gray-200 transition duration-200" + (message !== "" ? " border-red-500 border-2 " : "")}
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="fas fa-lock absolute right-3 top-3 text-white"></i>
                </div>
                <h1 className="text-center text-red-600 bg-opacity-20 text-sm mt-0 h-auto">
                    {message}
                </h1>
                <button
                    type="submit"
                    className="bg-white text-gray-700 w-full font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </button>
            </div>
            {
                Loading ? <div className="fixed w-screen h-screen top-0 -left-[34rem] right-0 bottom-0 m-auto bg-black bg-opacity-50 z-50
                flex items-center justify-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-center w-1/6 h-1/6 animate-spin duration-1000 " />
                </div> : ''
            }
        </>
    );
};

export default Validador;
