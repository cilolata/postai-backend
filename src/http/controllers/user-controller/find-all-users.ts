import { Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindUserUseCase } from "../../../use-cases/factory/make-find-user-user-case";

export const findAllUsersController = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  const registerQuerySchema = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search ? String(search) : undefined,
  };

  try {
    const findAllUserUseCase = makeFindAllUsersUseCase();
    const users = await findAllPostsUseCase.findAllUsersUseCase(
      registerQuerySchema.page,
      registerQuerySchema.limit,
      registerQuerySchema.search,
    );

    if (!users) {
      throw new ErrorHandler(404, "Posts nao encontrado");
    }
    res.status(200).json({ posts });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
