import { useEffect, useState } from "react";
import { checkToken as tokenChecker } from "../utilities/tokenChecker";
import AccessByRole from "./home/AccessByRole";

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
            <AccessByRole accessTo="WelcomeOptions" />
        </div>
    );
};

export default Welcome;
