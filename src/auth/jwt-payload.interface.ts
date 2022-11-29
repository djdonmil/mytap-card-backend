export interface JwtPayload {
    id: string;
    username: string,
    phone?: string,
    firstName: string;
    lastName: string;
    email: string;
    salt: string;
    accessToken?: string;
    roleId?: number;
    refrenceId?: string;
}