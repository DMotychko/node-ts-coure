import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/IUser";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: false },
        role: { type: String, required: true, default: "user" },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", userSchema);
