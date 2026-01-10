import { Request, Response } from "express";
import { makeUpdateUserUseCase } from "../../../use-cases/factory/make-update-user";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { removeUndefinedValues } from "../../../utils";

export const updatedUserController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { username, password, email } = req.body;

  const userSchema = {
    id: userId,
    username: username ?  String(username) : undefined,
    password: password ?  String(password) : undefined,
    email: email ? String(email) : email,
  };

  try {
    const values = removeUndefinedValues(userSchema);
    const findUserUseCase = makeUpdateUserUseCase();
    const users = await findUserUseCase.updateUserUseCase(userSchema);
    res.status(200).json({ users });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
