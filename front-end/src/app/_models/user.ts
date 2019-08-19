import { Role } from "./role";

export class User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    afm: string;
    role: Role;
    token?: string;
}