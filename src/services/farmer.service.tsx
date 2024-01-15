import axiosInstance from "../helpers/http.common.helper"

export function get_all_farmer_forms(): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/farmer/compensation/get-forms", options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}