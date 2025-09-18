import { AppDataSource } from "../../lib/typeorm/typeorm";
import { ILike, Repository } from "typeorm";
import { IPostRepository } from "../post.repository.interface";
import { IPost, IPostUpdate } from "../../entities/models/post.interface";
import { Posts } from "../../entities/post.entity";

export class PostRepository implements IPostRepository {
  private repository: Repository<Posts>;

  constructor() {
    this.repository = AppDataSource.getRepository(Posts);
  }

  async createPostRepository(post: IPost): Promise<IPost> {
    return await this.repository.save(post);
  }

  async findAllPostsRepository(
    page: number,
    limit: number,
    search?: string
  ): Promise<IPost[]> {
    const params = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (search) {
      return await this.repository.find({
        ...params,
        where: [
          { title: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
          { content: ILike(`%${search}%`) },
        ],
      });
    }

    return await this.repository.find(params);
  }

  async findPostByIdRepository(postId: number): Promise<IPost | undefined> {
    if (!postId) {
      return undefined;
    }

    const post = await this.repository.findOne({
      where: { id: postId },
    });

    return post ?? undefined;
  }

  async updatePostRepository(post: IPostUpdate): Promise<IPostUpdate | undefined> {
    if (!post.id) {
      throw new Error("Post não encontrado");
    }

    const prevPostValues = await this.repository.findOne({
      where: { id: post.id },
    });

    if (!prevPostValues) {
      return undefined;
    }

    const mergedPost = {
      ...prevPostValues,
      ...post,
    };

    await this.repository.update(post.id, mergedPost);
    return mergedPost;
  }

  async deletePostRepository(postId: number): Promise<void> {
    await this.repository.delete(postId);
  }
}
