import axiosInstance from "../helpers/http.common.helper"
import {editFormType, Form} from "../types/Form";

export function get_all_processed_forms(): Promise<any> {

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

export function get_all_forms(): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/employee/manager/get-forms/all", options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}

export function delete_form_by_id(formId: string): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get(`/employee/manager/delete/form/${formId}`, options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}

export function edit_form_by_id(formId: number, new_form: editFormType): Promise<any> {

    const options = {
        headers: {
            "Content-Type": "application/json",

        }

    }

    return new Promise((resolve, reject) => {
        axiosInstance
            .get(`/employee/manager/edit/form/${formId}`, options)
            .then(response => resolve(response.data))
            .catch(error => {
                console.error(error);
                reject(error);
            })
    })
}

