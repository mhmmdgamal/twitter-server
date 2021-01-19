import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTweetInput } from './input/create-tweet.input';
import { Tweet } from './models/tweet.model';
import { TweetsService } from './tweets.service';

@Resolver(of => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) { }

  @Query(returns => [Tweet])
  async tweets(): Promise<Tweet[]> {
    const tweets: Tweet[] = await this.tweetsService.findAll();
    if (!tweets) {
      throw new NotFoundException();
    }
    return tweets;
  }

  @Query(returns => Tweet)
  async tweet(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<Tweet> {
    const tweet = await this.tweetsService.findOne(id);
    if (!tweet) {
      throw new NotFoundException();
    }
    return tweet;
  }

  @Mutation(returns => Tweet)
  async createTweet(@Args('input') tweet: CreateTweetInput) {
    return this.tweetsService.add(tweet);
  }
}
