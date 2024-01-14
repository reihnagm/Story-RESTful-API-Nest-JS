import { UsersHttpModule } from '@modules/users/users-http.module';
import { StoriesHttpModule } from '@modules/stories/stories.http.module';
import { StoryTypesHttpModule } from '@modules/story-types/story-types.http.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NotFoundMiddleware } from '@middlewares/not-found';

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
    StoriesHttpModule,
    StoryTypesHttpModule,
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes('*');
  } 
}