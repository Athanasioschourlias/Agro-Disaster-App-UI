import axiosInstance from "../helpers/http.common.helper"

export function login(username: string,password: string): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST",
        },
        username: username,
        password: password


    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .post("/auth/login", options)
            .then(response => resolve(response))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}