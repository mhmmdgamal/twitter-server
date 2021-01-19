import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './models/tweet.model';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

@Module({
  imports: [SequelizeModule.forFeature([Tweet])],
  providers: [TweetsResolver, TweetsService],
})
export class TweetsModule { }
