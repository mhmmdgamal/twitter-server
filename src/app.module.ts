import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TweetsModule } from './tweet/tweets.module';
import { UsersModule } from './user/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';
import { Tweet } from './tweet/model/tweet.model';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule { }
