import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TweetsModule } from './tweets/tweets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { CommentsModule } from './comments/comments.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TweetsModule,
    DatabaseModule,
    CommentsModule,
    FollowersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule { }
