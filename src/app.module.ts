import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './modules/posts/post.entity';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: 'wwe',
      database: process.env.DB_NAME_DEVELOPMENT,
      entities: [User, Post],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
