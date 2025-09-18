import { Request, Response } from "express";
import { makeFindAllPostsUseCase } from "../../../use-cases/factory/make-find-all-posts-use-case";
import { ErrorHandler } from "../../../middlewares/errorHandlers";

export const findAllPostsController = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  const registerQuerySchema = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search ? String(search) : undefined,
  };

  try {
    const findAllPostsUseCase = makeFindAllPostsUseCase();
    const posts = await findAllPostsUseCase.findAllPostsUseCase(
      registerQuerySchema.page,
      registerQuerySchema.limit,
      registerQuerySchema.search
    );

    if (!posts) {
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
