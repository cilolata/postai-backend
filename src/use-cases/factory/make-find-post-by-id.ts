import { PostRepository } from "../../repositories/typeorm/post.repository";
import { FindPostByIdsUserUseCase } from "../post/find-post-by-id";

export const makeFindPostByIdUseCase = () => {
  const postsRepository = new PostRepository();
  const findPostUseCase = new FindPostByIdsUserUseCase(postsRepository);
  return findPostUseCase;
};
