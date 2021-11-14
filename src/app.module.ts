import { AuthHttpModule } from '@modules/auth-http.module';
import { StoryViewHttpModule } from '@modules/story_view-http.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        index: false
      }
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
    StoryViewHttpModule,
  ],
})
export class AppModule {}
