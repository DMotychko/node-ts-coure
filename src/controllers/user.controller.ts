import { NextFunction, Request, Response } from "express";

import { IUser, IUserCreateDto, IUserUpdateDto } from "../interfaces/IUser";
import { userService } from "../services/user.service";

class UserController {
    public async getList(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const result: IUser[] = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const dto = req.body as IUserCreateDto;
            const result: IUser = await userService.create(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userId = req.params.userId;
            const user = await userService.getById(userId);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async changeById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userId = req.params.userId;
            const dto = req.body as IUserUpdateDto;
            const response = await userService.changeById(dto, userId);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            await userService.deleteById(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
