import {User} from "./user";

export type Form = {
    id: number;
    user: User;
    location: string;
    damageDescription: string;
    acres: number;
    cropType: string;
    status: string; // Assuming status can only be one of these values "PENDING" | "APPROVED" | "REJECTED" | "APPOINTMENT"
};

export type editFormType = {
    location: string;
    damageDescription: string;
    acres: number;
    cropType: string;
    status: string;
}