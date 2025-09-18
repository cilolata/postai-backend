import { IPost } from "../../entities/models/post.interface";
import { IPostRepository } from "../../repositories/post.repository.interface";


export class FindPostByIdsUserUseCase {
    constructor(private postRepository: IPostRepository) {}
  
    async findAllPostsUseCase(postId: number): Promise<IPost | undefined> {
      return await this.postRepository.findPostByIdRepository(postId)
    }
  }