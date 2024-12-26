export interface IUser {
    name: string;
    email: string;
    age: number;
    password: string;
    phone?: string;
    role: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: Date;
    updated: Date;
}

export type IUserCreateDto = Pick<
    IUser,
    "name" | "email" | "age" | "phone" | "password"
>;
export type IUserUpdateDto = Pick<IUser, "name" | "age" | "phone">;
