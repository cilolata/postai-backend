import { Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindUserUseCase } from "../../../use-cases/factory/make-find-user-user-case";

export const findUsersController = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const userSchema = {
    username: String(username),
    password: String(password),
    email: String(email) ?? undefined,
  };

  try {
    const findUserUseCase = makeFindUserUseCase();
    const user = await findUserUseCase.findUserUseCase(userSchema);

    if (!user) {
      throw new ErrorHandler(404, "Usuário não encontrado");
    }
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
