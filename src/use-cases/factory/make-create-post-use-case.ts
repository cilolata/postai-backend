import { PostRepository } from "../../repositories/typeorm/post.repository";
import { CreatePostrUseCase } from "../post/create-post";


export const makeCreatePostUseCase = () => {
    const postRepository = new PostRepository();
    const createPostUseCase = new CreatePostrUseCase(postRepository);
    return createPostUseCase;
}