import { Request, Response } from "express";
import { makeFindUserUseCase } from "../../../use-cases/factory/make-find-user-user-case";
import { makeUpdateUserUseCase } from "../../../use-cases/factory/make-update-user";
import { ErrorHandler } from "../../../middlewares/errorHandlers";

export const updatedUserController = async (
    req: Request,
    res: Response
  ) => {
    const userId = Number(req.params.id);
    const { username, password, email } = req.body;

    const userSchema = {
      id: userId,
      username: String(username),
      password: String(password),
      email: String(email) ?? undefined,
    };
  
  
    try {
        const findUserUseCase = makeUpdateUserUseCase();
        const post = await findUserUseCase.updateUserUseCase(userSchema);
  
      if (!post) {
        throw new ErrorHandler(404, "Post nao encontrado");
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error;
      }
      throw new ErrorHandler(500, "Erro ao conectar servidor");
    }
  };
  