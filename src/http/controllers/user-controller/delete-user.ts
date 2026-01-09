import { Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandlers";

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  if (!userId) {
    throw new ErrorHandler(404, "Usuário nao encontrado");
  }

  try {
    const deleteUsertUseCase = makeDeleteUserByIdUseCase();
    const user = await deleteUserUseCase.deletePostUseCase(postId);
    res.status(200).json({ message: "Usuário deletado com sucesso", post });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
