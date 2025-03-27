import { apiConfig } from "./apiConfig";

export const tokenChecker = async (token) => {
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