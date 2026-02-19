import { IPost } from "../../entities/models/post.interface";
import { bucket } from "../../lib/firebase/firebase";
import { IPostRepository } from "../../repositories/post.repository.interface";

export class FindPostByIdsUserUseCase {
  constructor(private postRepository: IPostRepository) {}

  async findAllPostsUseCase(postId: number): Promise<IPost | undefined> {
    const post = await this.postRepository.findPostByIdRepository(postId);
    return post;
  }
}
