import { Request, Response } from "express";
import { makeFindPostByIdUseCase } from "../../../use-cases/factory/make-find-post-by-id";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindUserUseByIdCase } from "../../../use-cases/factory/make-find-user-by-id";

export const FindPostByIdPostController = async (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.id);

  try {
    const findPostUseCase = makeFindPostByIdUseCase();
    const findUserByIdUseCase = makeFindUserUseByIdCase();
    const post = await findPostUseCase.findAllPostsUseCase(postId);

    if (post?.user_id && post) {
      const user = await findUserByIdUseCase.findUserByIdUseCase(post?.user_id);
      res.status(200).json({ post, professor: user?.username });
    } else if (post) {
      res.status(200).json({ post });
    } else {
      throw new ErrorHandler(404, "Post nao encontrado");
    }
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
