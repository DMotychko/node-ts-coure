import { ApiError } from "../errors/api-error";
import { IUser } from "../models/IUser";
import { IUserDto } from "../models/IUserDto";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: IUserDto): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async changeById(dto: IUserDto, userId: number): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }
    return await userRepository.changeById(dto, userId);
  }
  public async deleteById(userId: number): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
