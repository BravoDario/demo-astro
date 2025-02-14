import { apiConfig } from "./apiConfig";

export const tokenChecker = (token) => {
    if (token) {
        fetch(`${apiConfig.endpoint}/checkToken?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            console.log(data);
            return data ?? null;
            
        }).catch(err=> {
            console.log("error", err);
            
            return null;
        });
    } else {
        return null;
    }
};