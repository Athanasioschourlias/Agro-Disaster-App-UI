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

export function delete_form_by_id(form_id: number): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .delete(`/farmer/compensation/delete/form/${form_id}`, options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}

export function create_form(location: string, acres: number, cropType: string, damageDesc: string): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        },
        "location": location,
        "acres": acres,
        "cropType": cropType,
        "damageDescription": damageDesc

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .post(`farmer/compensation/create`, options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}