import axiosInstance from "../helpers/http.common.helper";

export function healthCheck(): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "GET",
        }
    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/health/check/6545456", options)
            .then(response => resolve(response))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}