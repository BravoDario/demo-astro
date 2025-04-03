import { useEffect, useState } from "react";
import { checkToken } from "../../utilities/tokenChecker";
import { faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import AccessByRole from "./AccessByRole";

const SessionHandler = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLogin, setIsLogin] = useState(!!token);
    const [options, setOptions] = useState(false);

    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                const result = await checkToken(token);
                setIsLogin(result.isLogin ?? false);
            } else {
                setIsLogin(false);
            }
        };

        validateSession();
    }, [token]);

    useEffect(() => {
        const handleClick = (e) => {
            if (options) setOptions(false);
        };

        if (options) {
            document.addEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [options]);

    return (
        <div className="h-full w-full">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOptions(!options);
                }}
                className="text-white h-full p-2 flex items-center justify-center gap-2 ml-5"
            >
                <FontAwesomeIcon className="text-white h-full" icon={faUserCircle} />
                <FontAwesomeIcon className="text-white h-1/2" icon={faChevronDown} />
            </button>
            {options && (
                <div className="w-11/12 ml-5">
                    <AccessByRole accessTo="SessionHandlerOptions" />
                </div>
            )}
        </div>
    );
};

export default SessionHandler;