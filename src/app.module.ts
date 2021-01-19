import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TweetsModule } from './tweets/tweets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { CommentModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    DatabaseModule,
    CommentModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule { }
