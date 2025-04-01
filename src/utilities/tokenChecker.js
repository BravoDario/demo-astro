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
            console.log("data", data);
            if (!data.isLogin) {
                window.localStorage.removeItem("token");
            }
            Cookies.set("token-demo", token);
            return data;
        }).catch(err => {
            return { isLogin: false };
        });
    } else {
        return {
            isLogin: false,
        };
    }
};

export const getToken = () => {
    //const token = window.localStorage.getItem("token");
    const token = Cookies.get("token-demo");
    return token ?? "";
};