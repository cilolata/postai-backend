import { PostRepository } from "../../repositories/typeorm/post.repository";
import { FindAllPostsUserUseCase } from "../post/find-all-posts";

export function makeFindAllPostsUseCase() {
  const postsRepository = new PostRepository();
  const findAllPostsUseCase = new FindAllPostsUserUseCase(postsRepository);
  return findAllPostsUseCase;
}
