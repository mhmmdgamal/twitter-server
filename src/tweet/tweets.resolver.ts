import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTweetInput } from './input/create-tweet.input';
import { FindTweetInput } from './input/find-tweet.input';
import { UpdateTweetInput } from './input/update-tweet.input';
import { Tweet } from './model/tweet.model';
import { TweetsService } from './tweets.service';

@Resolver()
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
    return await this.tweetsService.add(input);
  }

  @Mutation(() => Tweet)
  async updateTweet(@Args('input') input: UpdateTweetInput) {
    return await this.tweetsService.update(input);
  }
}
