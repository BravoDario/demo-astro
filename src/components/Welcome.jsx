import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faUser, faGamepad, faSign, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { tokenChecker } from "../helper/tokenChecker";

const Welcome = () => {
    const token = localStorage.getItem("token");
    const [isLogin, setIsLogin] = useState(token ? true : false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                const result = await tokenChecker(token);
                setIsLogin(result.isLogin);
                setMessage(result.message);
            } else {
                setIsLogin(false);
                setMessage("No hay token disponible.");
            }
        };

        validateSession();
    }, [token]);

    return (
        <div className="h-full py-4">
            {isLogin ? <h1 className="text-2xl font-bold text-center">Myau Page</h1> : ''}
            <div className="flex items-center justify-center gap-2 h-full my-10">
                <a
                    href="/blog"
                    className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                >
                    <span className="w-full h-1/3">
                        <FontAwesomeIcon icon={faFile} className="text-center w-full h-full " />
                    </span>
                    <h1 className="text-lg text-center mt-4">Blog</h1>
                </a>
                <a
                    href="/cv"
                    className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                >
                    <span className="w-full h-1/3">
                        <FontAwesomeIcon icon={faUser} className="text-center w-full h-full " />
                    </span>
                    <h1 className="text-lg text-center mt-4">CV</h1>
                </a>
                <a
                    href="/game"
                    className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                >
                    <span className="w-full h-1/3">
                        <FontAwesomeIcon icon={faGamepad} className="text-center w-full h-full " />
                    </span>
                    <h1 className="text-lg text-center mt-4">JUgo</h1>
                </a>
                {isLogin ? (
                    <a
                        href="/myausita"
                        className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                    >
                        <span className="w-full h-1/3">
                            <FontAwesomeIcon icon={faSign} className="text-center w-full h-full " />
                        </span>
                        <h1 className="text-lg text-center mt-4">myausita ;3</h1>
                    </a>
                ) : (
                    <a
                        href="/login"
                        className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                    >
                        <span className="w-full h-1/3">
                            <FontAwesomeIcon icon={faUserCircle} className="text-center w-full h-full " />
                        </span>
                        <h1 className="text-lg text-center mt-4">Iniciar sesión</h1>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Welcome;
