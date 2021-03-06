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
    id: string;
    username: string;
    name: string;
    role: UserRole;
    score?: number[];
    avatar: string;
}

export interface DataLogin {
    username: string;
    password: string;
}

export interface DataRegister extends DataLogin {
    name: string;
}

export interface UpdateProfile {
    name: string;
    avatar?: string;
}

export interface ChangePassword {
    password: string;
    newPassword: string;
    reNewPassword: string;
}
