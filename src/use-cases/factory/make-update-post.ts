import { PostRepository } from "../../repositories/typeorm/post.repository";
import { UpdatePostUserUseCase } from "../post/update-post";

export function makeUpdatePostUseCase() {
    const postsRepository = new PostRepository();
    const updatePostsUseCase = new UpdatePostUserUseCase(postsRepository);
    return updatePostsUseCase;
  }