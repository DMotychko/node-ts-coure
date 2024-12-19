import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { read, write } from "./fs.service";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response): Promise<void> => {
  const users = await read();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response): Promise<void> => {
  const users = await read();
  const newUser = {
    id: users.length ? users.length + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(newUser);
  await write(users);
  res.status(201).json(newUser);
});

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<void> => {
    const users = await read();
    const user = users.find((user) => user.id === Number(req.params.userId));
    res.json(user);
  },
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<void> => {
    const users = await read();
    const index = users.findIndex((user) => user.id === +req.params.userId);
    const user = users[index];
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    res.json(users);
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<void> => {
    const users = await read();
    const index = users.findIndex((user) => user.id === +req.params.userId);
    users.splice(index, 1);
    await write(users);
    res.sendStatus(204);
  },
);
const port = process.env.PORT;
app.listen(port);
