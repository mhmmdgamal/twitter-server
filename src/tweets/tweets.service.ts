import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreateTweetInput } from './inputs/create-tweet.input';
import { UpdateTweetInput } from './inputs/update-tweet.input';
import { Tweet } from './models/tweet.model';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
  ) { }

  async findAll(): Promise<Tweet[]> {
    const tweets: Tweet[] = await this.tweetModel.findAll({ include: [User] });

    if (!tweets) {
      throw new NotFoundException();
    }
    return tweets;
  }

  async findOne(id: string): Promise<Tweet> {
    const tweet: Tweet = await this.tweetModel.findOne({
      where: {
        id,
      },
      include: [User],
    });

    if (!tweet) {
      throw new NotFoundException();
    }

    return tweet;
  }

  async remove(id: string): Promise<void> {
    const tweet = await this.findOne(id);
    await tweet.destroy();
  }

  async create(tweet: CreateTweetInput): Promise<Tweet> {
    return await this.tweetModel.create({ ...tweet });
  }

  async update(input: UpdateTweetInput) {
    const tweet: Tweet = await this.findOne(input.tweetId);
    return await tweet.update({ ...input });
  }
}
