import { AuthHttpModule } from '@modules/auth/auth-http.module';
import { StoryContentHttpModule } from '@modules/story-content/story-content.http.module';
import { StoryContentTypeHttpModule } from '@modules/story-content-type/story-content-type.http.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/'),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
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
    AuthHttpModule,
    StoryContentHttpModule,
    StoryContentTypeHttpModule,
  ],
})
export class AppModule {}
