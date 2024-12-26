import { ApiError } from "../errors/api-error";
import { IUser, IUserCreateDto, IUserUpdateDto } from "../interfaces/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }
    public async create(dto: IUserCreateDto): Promise<IUser> {
        await this.isEmailUnique(dto.email);
        return await userRepository.create(dto);
    }
    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return user;
    }
    public async changeById(
        dto: IUserUpdateDto,
        userId: string,
    ): Promise<IUser> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError(
                "Name is required and should be minimum 3 symbols",
                400,
            );
        }
        return await userRepository.changeById(dto, userId);
    }
    public async deleteById(userId: string): Promise<void> {
        return await userRepository.deleteById(userId);
    }
    private async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("Email id already in use", 409);
        }
    }
}

export const userService = new UserService();
