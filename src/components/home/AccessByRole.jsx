import { faFile, faGamepad, faSign, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import logout from "../../utilities/Auth";
import { checkToken } from "../../utilities/tokenChecker";

const AccessByRole = ({ accessTo }) => {
    const [role, setRole] = useState(localStorage.getItem("role") ?? '');
    const token = localStorage.getItem("token");
    const [isLogin, setIsLogin] = useState(token ? true : false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                const result = await checkToken(token);
                setIsLogin(result.isLogin);
                setMessage(result.message);
            } else {
                setIsLogin(false);
                setMessage("No hay token disponible.");
            }
        };

        validateSession();
    }, [token]);

    const types = {
        SessionHandlerOptions: {
            admin: <ul className="bg-slate-300 py-2 rounded-md w-1/2 flex flex-col text-center">
                <a href="#" className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white">
                    Perfil
                </a>
                <a href="/blogsmenu" className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white">
                    Menú de blogs
                </a>
                <button
                    className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white"
                    onClick={() => logout(token)}
                >
                    Logout
                </button>
            </ul>,
            user: <ul className="bg-slate-300 py-2 rounded-md w-1/2 flex flex-col text-center">
                <a href="#" className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white">
                    Perfil
                </a>
                <button
                    className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white"
                    onClick={() => logout(token)}
                >
                    Logout
                </button>
            </ul>,
            "": <ul className="bg-slate-300 py-2 rounded-md w-1/2 flex flex-col text-center">
                <a
                    href="/login"
                    className=" w-full px-4 py-2 hover:bg-blue-700 hover:text-white"
                >
                    Iniciar sesión
                </a>
            </ul>,
        },
        WelcomeOptions: {
            admin: <div className="flex items-center justify-center gap-2 h-full my-10">
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
                <a
                    href="/myausita"
                    className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                >
                    <span className="w-full h-1/3">
                        <FontAwesomeIcon icon={faSign} className="text-center w-full h-full " />
                    </span>
                    <h1 className="text-lg text-center mt-4">myausita ;3</h1>
                </a>
            </div>,
            user: <div className="flex items-center justify-center gap-2 h-full my-10">
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
            </div>,
            "": <div className="flex items-center justify-center gap-2 h-full my-10">
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
                    href="/login"
                    className="bg-slate-900 text-gray-300 rounded hover:bg-slate-700 hover:text-gray-100 h-40 w-32 flex flex-col align-middle justify-center"
                >
                    <span className="w-full h-1/3">
                        <FontAwesomeIcon icon={faUserCircle} className="text-center w-full h-full " />
                    </span>
                    <h1 className="text-lg text-center mt-4">Iniciar sesión</h1>
                </a>
            </div>,
        },
        NavbarOptions: {
            admin: <></>,
            user: <></>,
            "": <></>
        }
    }

    return types[accessTo][role];
};

export default AccessByRole;