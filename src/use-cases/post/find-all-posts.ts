import { IPost } from "../../entities/models/post.interface";
import { IPostRepository } from "../../repositories/post.repository.interface";


export class FindAllPostsUserUseCase {
  constructor(private postRepository: IPostRepository) {}

  async findAllPostsUseCase(
    page: number,
    limit: number,
    search?: string
  ): Promise<IPost[] | undefined> {
    const searchTermNormalize = search ? search
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') : undefined;
      
    const posts = await this.postRepository.findAllPostsRepository(
      Number(page),
      Number(limit),
      searchTermNormalize
    );
    return posts;
  }
}
