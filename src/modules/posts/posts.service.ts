import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
// import { User } from '../users/user.entity';
// import { POST_REPOSITORY } from 'src/core/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async create(post: PostDto, userId: number): Promise<Post> {
    const postCreate = this.postRepository.create(post);
    postCreate.userId = userId;
    return await this.postRepository.save(postCreate);
  }
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user'],
      select: ['id', 'title', 'body', 'user'],
    });
  }
  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: ['id', 'title', 'body', 'user'],
    });
  }
  async delete(id: number, userId: number): Promise<number> {
    const result: DeleteResult = await this.postRepository.delete({
      id,
      userId,
    });
    return result.affected ?? 0;
  }
  async update(id: number, data: PostDto, userId: number): Promise<Post> {
    await this.postRepository.update(id, {
      ...data,
      userId,
    });
    return this.postRepository.findOneBy({ id });
  }
}
