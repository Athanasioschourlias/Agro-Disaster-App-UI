export type User = {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    roles: Array<unknown>; // Adjust the type based on the actual structure of roles
    tinNumber: string;
};
