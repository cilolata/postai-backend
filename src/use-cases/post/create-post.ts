import { IPost } from "../../entities/models/post.interface";
import { IPostRepository } from "../../repositories/post.repository.interface";


export class CreatePostrUseCase {
  constructor(private postRepository: IPostRepository) {}

  async createPostUseCase(post: IPost): Promise<IPost | undefined> {
    return this.postRepository.createPostRepository(post);
  }
}
