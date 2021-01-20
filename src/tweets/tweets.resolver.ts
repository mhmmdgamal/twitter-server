import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateTweetInput } from './inputs/create-tweet.input';
import { FindTweetInput } from './inputs/find-tweet.input';
import { UpdateTweetInput } from './inputs/update-tweet.input';
import { Tweet } from './models/tweet.model';
import { TweetsService } from './tweets.service';

@Resolver()
@UseGuards(GqlAurhGuard)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) { }

  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return await this.tweetsService.findAll();
  }

  @Query(() => Tweet)
  async tweet(@Args() input: FindTweetInput): Promise<Tweet> {
    return await this.tweetsService.findOne(input.id);
  }

  @Mutation(() => Tweet)
  async createTweet(@Args('input') input: CreateTweetInput) {
    return await this.tweetsService.create(input);
  }

  @Mutation(() => Tweet)
  async updateTweet(@Args('input') input: UpdateTweetInput) {
    return await this.tweetsService.update(input);
  }
}
