import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from './src/modules/users/user.entity';
import { Post } from './src/modules/posts/post.entity';

// Load environment variables
config();

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: 'wwe',
  database: process.env.DB_NAME_DEVELOPMENT,
  entities: [User, Post],
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
};

export default ormConfig;
