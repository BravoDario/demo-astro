import { apiConfig } from "./apiConfig";

const logout = (token) => {
    localStorage.removeItem("token");
    fetch(`${apiConfig.endpoint}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: `{"token": "${token}"}`,
    }).then(res => res.json()).then(data => {
        console.log("data", data);
        if (!data.isLogin) {
            window.localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return data;
    }).catch(err => {
        return { isLogin: false };
    });
};

export default logout;