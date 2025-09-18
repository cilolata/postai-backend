import { IPost, IPostUpdate } from "../entities/models/post.interface";

export interface IPostRepository {
    createPostRepository(post: IPost): Promise<IPost | undefined>;
    findAllPostsRepository(upage: number, limit: number, search?: string): Promise<IPost[] | []>;
    findPostByIdRepository(postId: number): Promise<IPost | undefined>;
    updatePostRepository(post: IPostUpdate): Promise<IPostUpdate | undefined>;
    deletePostRepository(postId: number): Promise<void>;
}