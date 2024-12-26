import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
    "*",
    (error: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = error.status || 500;
        const message = error.message ?? "Something went wrong";

        res.status(status).json({ status, message });
    },
);
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

const port = config.port;
app.listen(port, async () => {
    console.log(config.mongoUrl);
    await mongoose.connect(config.mongoUrl);
    console.log(`server started on port: ${port}`);
});
