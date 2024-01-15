import axiosInstance from "../helpers/http.common.helper"

export function get_all_users(): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/admin/users/get_all", options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}


export function delete_user_by_tin(tin: string): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .delete(`/admin/users/delete/${tin}`, options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}