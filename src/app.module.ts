import { UsersHttpModule } from '@modules/users/users-http.module';
import { StoriesHttpModule } from '@modules/stories/stories.http.module';
import { StoryTypesHttpModule } from '@modules/story-types/story-types.http.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NotFoundMiddleware } from '@middlewares/not-found';
import { RouterModule } from '@nestjs/core';
import { UserStoriesHttpModule } from '@modules/user-stories/user-stories.http.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'story_view',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersHttpModule,
    RouterModule.register([
      {
        path: 'users/v1',
        module: UsersHttpModule,
      }
    ]),
    StoriesHttpModule,
    RouterModule.register([
      {
        path: 'stories/v1',
        module: StoriesHttpModule,
      },
    ]),
    StoryTypesHttpModule,
    RouterModule.register([
      {
        path: 'story-types/v1',
        module: StoryTypesHttpModule,
      }
    ]),
    UserStoriesHttpModule,
    RouterModule.register([
      {
        path: 'user-stories/v1',
        module: UserStoriesHttpModule
      }
    ])
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes('*');
  } 
}