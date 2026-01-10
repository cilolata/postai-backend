import { IPost } from "../../entities/models/post.interface";
import { IPostRepository } from "../../repositories/post.repository.interface";

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async deletePostUseCase(postId: number): Promise<IPost[] | undefined> {
    return this.postRepository.deletePostRepository(postId);
  }
}
