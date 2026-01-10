import { Request, Response } from "express";
import { makeUpdatePostUseCase } from "../../../use-cases/factory/make-update-post";
import { removeUndefinedValues } from "../../../utils";
import { ErrorHandler } from "../../../middlewares/errorHandlers";
import { makeFindPostByIdUseCase } from "../../../use-cases/factory/make-find-post-by-id";

export const updatedpostByIdPostController = async (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.id);
  const { title, description, subject, content, user_id, teacher } = req.body;

  const postUpdateSchema = {
    id: postId ? Number(postId) : undefined,
    title: title ? String(title) : undefined,
    description: description ? String(description) : undefined,
    content: content ? String(content) : content,
    subject: subject ? String(subject) : undefined,
    updated_at: new Date(),
    user_id: Number(user_id),
    teacher: teacher ? String(teacher) : undefined
  };

  try {
    const findPostUseCase = makeFindPostByIdUseCase();
    const post = await findPostUseCase.findAllPostsUseCase(postId);
    const values = removeUndefinedValues(postUpdateSchema);
    const updatePost = makeUpdatePostUseCase();
    const posts = await updatePost.updatePostUseCase(values);
    res.status(200).json({ posts });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(500, "Erro ao conectar servidor");
  }
};
