import { Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeDeleteUserByIdUseCase } from "../../../use-cases/factory/make-delete-user";

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const deleteUsertUseCase = makeDeleteUserByIdUseCase();
    const users = await deleteUsertUseCase.deleteUserUseCase(userId);
    res.status(200).json({ users });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
