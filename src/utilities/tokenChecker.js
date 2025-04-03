import logout from "./Auth";
import { apiConfig } from "./apiConfig";
import Cookies from 'js-cookie';

export const checkToken = async (token) => {
    if (token) {
        fetch(`${apiConfig.endpoint}/checkToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: `{"token": "${token}"}`,
        }).then(res => res.json()).then(data => {
            const { isLogin, message } = data;
            
            if (!isLogin) {
                logout(token);
            }
            
            Cookies.set("token-demo", token);
            
            return { isLogin, message };
        }).catch(err => {
            return { isLogin: false, message: "Ha ocurrido un error interno." };
        });
    }
    return {
        isLogin: false,
        message: "No hay token disponible.",
    };
};

export const getToken = () => {
    const token = Cookies.get("token-demo");
    console.log("mkaldsakldj");
    console.log(token);
    return token ?? "";
};