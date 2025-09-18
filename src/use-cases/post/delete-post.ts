import { IPostRepository } from "../../repositories/post.repository.interface";

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async deletePostUseCase(postId: number): Promise<void | undefined> {
    return this.postRepository.deletePostRepository(postId);
  }
}
