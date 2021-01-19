import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreateTweetInput } from './input/create-tweet.input';
import { Tweet } from './models/tweet.model';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
  ) { }

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.findAll({ include: [User] });
  }

  findOne(id: string): Promise<Tweet> {
    return this.tweetModel.findOne({
      where: {
        id,
      },
      include: [User],
    });
  }

  async remove(id: string): Promise<void> {
    const tweet = await this.findOne(id);
    await tweet.destroy();
  }

  async add(tweet: CreateTweetInput): Promise<Tweet> {
    return this.tweetModel.create(tweet);
  }
}
