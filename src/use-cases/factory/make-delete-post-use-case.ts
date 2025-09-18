import { PostRepository } from "../../repositories/typeorm/post.repository";
import { DeletePostUseCase } from "../post/delete-post";

export const makeDeletePostByIdUseCase = () => {
  const postsRepository = new PostRepository();
  const deletePostUseCase = new DeletePostUseCase(postsRepository);
  return deletePostUseCase;
};