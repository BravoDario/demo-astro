
import { useEffect, useState } from "react";
import { tokenChecker } from "../../helper/tokenChecker";
import logout from "../../helper/Auth";
import { faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SessionHandler = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [isLogin, setIsLogin] = useState(token ? true : false);
    const [message, setMessage] = useState("");
    const [options, setOptions] = useState(false)

    const optionsByRole = {
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
    };

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
        <div className="h-full w-full">
            <button onClick={() => setOptions(!options)} className="text-white h-full p-2 flex items-center justify-center gap-2 ml-5">
                <FontAwesomeIcon className="text-white h-full" icon={faUserCircle} />
                <FontAwesomeIcon className="text-white h-1/2" icon={faChevronDown} />
            </button>
            {
                options ? <div className="w-11/12 ml-5">
                    {
                        isLogin ? optionsByRole[role] : optionsByRole[""]
                    }
                </div> : ''
            }
        </div>
    );
};

export default SessionHandler;