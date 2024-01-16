import {User} from "./user";

export type Form = {
    id: number;
    user: User;
    location: string;
    damageDescription: string;
    acres: number;
    cropType: string;
    status: "PENDING" | "APPROVED" | "REJECTED"; // Assuming status can only be one of these values
};