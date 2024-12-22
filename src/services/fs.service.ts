import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../models/IUser";

const pathToFile = path.join(process.cwd(), "db", "users.json");

const read = async (): Promise<IUser[]> => {
  try {
    const users = await fs.readFile(pathToFile, "utf-8");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.log(error.message);
  }
};
const write = async (users: IUser[]): Promise<void> => {
  try {
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (error) {
    console.log(error.message);
  }
};
export { read, write };
