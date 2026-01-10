import { Request, Response } from "express";
import { makeDeletePostByIdUseCase } from "../../../use-cases/factory/make-delete-post-use-case";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindAllPostsUseCase } from "../../../use-cases/factory/make-find-all-posts-use-case";

export const deletePostByIdPostController = async (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.id);

  if (!postId) {
    throw new ErrorHandler(404, "Post nao encontrado");
  }

  try {
    const deletePostUseCase = makeDeletePostByIdUseCase();
    const post = await deletePostUseCase.deletePostUseCase(postId);
    res.status(200).json({ post });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
