export type AuthToken = string;

export enum UserRole {
    teacher = 'teacher',
    student = 'student',
    admin = 'admin',
}
export interface UserToken {
    authToken: string;
}

export interface ResponseAuth {
    accessToken: string;
    information: User;
}

export interface User {
    _id: string;
    username: string;
    name: string;
    role: UserRole;
    score?: number[];
}

export interface DataLogin {
    username: string;
    password: string;
}

export interface DataRegister extends DataLogin {
    name: string;
}
