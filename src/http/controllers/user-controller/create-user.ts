import { Request, Response } from "express";
import { fromDbPermission } from "../../../utils";
import { makeCreateUserUseCase } from "../../../use-cases/factory/make-create-user-use-case";
import { ErrorHandler } from "../../../middlewares/errorHandlers";


export const createUserController = async (req: Request, res: Response) => {
  const { id, username, password, permissionType, email } = req.body;

  const userSchema = {
    username: String(username),
    password: String(password),
    email: String(email) ?? undefined,
    permission_type: fromDbPermission(permissionType),
  };

  try {
  const createUserUseCase = makeCreateUserUseCase();
  await createUserUseCase.createUserUseCase(userSchema);
  return res.status(201).json({ success: "Usuário criado com sucesso" });
   }  catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
