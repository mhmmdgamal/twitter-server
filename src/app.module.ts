import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TweetsModule } from './tweets/tweets.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { Tweet } from './tweets/models/tweet.model';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TweetsModule,
    AuthModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'twitter',
      password: 'twitter',
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
  providers: [],
})
export class AppModule { }
