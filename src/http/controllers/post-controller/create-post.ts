import { Request, Response } from "express";
import { makeCreatePostUseCase } from "../../../use-cases/factory/make-create-post-use-case";
import { EPermission } from "../../../entities/models/user.interface";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindUserUseCase } from "../../../use-cases/factory/make-find-user-user-case";
import { makeFindUserUseByIdCase } from "../../../use-cases/factory/make-find-user-by-id";

export const createPostController = async (req: Request, res: Response) => {
  const { title, description, subject, content, user_id } = req.body;

  const postSchema = {
    title: String(title),
    description: String(description),
    subject: subject ? String(subject) : undefined,
    content: String(content),
    created_at: new Date(),
    user_id: Number(user_id)
  };

  try {
    const findUserPermission = makeFindUserUseByIdCase();
    const user = await findUserPermission.findUserByIdUseCase(user_id);

    if (!user) {
      throw new ErrorHandler(404, "Usuário nao encontrado");
    }

    if (user?.permission_type !== EPermission.TEACHER) {
      throw new ErrorHandler(
        401,
        "Usuário não tem permissão para criar postagens"
      );
    }
    const newPost = {...postSchema, teacher: user.username}
    const createPostUseCase = makeCreatePostUseCase();
    await createPostUseCase.createPostUseCase(newPost);
    return res.status(201).json({ success: "Post criado com sucesso" });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
