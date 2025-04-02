
import { useEffect, useState } from "react";
import { checkToken } from "../../utilities/tokenChecker";
import logout from "../../utilities/Auth";
import { faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';

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
                const result = await checkToken(token);
                setIsLogin(result.isLogin??false);
                setMessage(result.message);
                Cookies.set("token-demo", token, { expires: 7 });
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
                        optionsByRole[ isLogin ? role : "" ]
                    }
                </div> : ''
            }
        </div>
    );
};

export default SessionHandler;