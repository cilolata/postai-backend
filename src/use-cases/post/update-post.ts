import { IPostUpdate } from "../../entities/models/post.interface";
import { IPostRepository } from "../../repositories/post.repository.interface";


export class UpdatePostUserUseCase {
    constructor(private postRepository: IPostRepository) {}
  
    async updatePostUseCase(post: IPostUpdate): Promise<IPostUpdate | undefined> {
      return await this.postRepository.updatePostRepository(post);
    }
}
