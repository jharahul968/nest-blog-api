import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
// import { USER_REPOSITORY } from 'src/core/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(user: UserDto): Promise<User> {
    const userCreate = this.userRepository.create(user);
    return await this.userRepository.save(userCreate);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
