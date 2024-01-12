import axiosInstance from "../helpers/http.common.helper"

export function login(SourceUserInput: string,TargetUserInput: string,task_id: number): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            username: "219113",
            password: "admin"
        }
    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .post("/auth/login", options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}