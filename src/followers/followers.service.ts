import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreateFollowerInput } from './inputs/create-follower.input';
import { RemoveFollowerInput } from './inputs/remove-follower.input';
import { Follower } from './models/follower.model';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower)
    private followerModel: typeof Follower,
  ) { }

  async findAllFollowers(userId: string): Promise<Follower[]> {
    const followers: Follower[] = await this.followerModel.findAll({
      include: [User],
      where: { userId },
    });

    return followers;
  }

  async create(input: CreateFollowerInput): Promise<Follower> {
    const follower: Follower = await this.followerModel.findOne({
      where: { ...input },
    });

    if (follower) {
      throw new Error('You are already following this person');
    }

    return await this.followerModel.create({ ...input });
  }

  async remove(input: RemoveFollowerInput) {
    const follower: Follower = await this.followerModel.findOne({
      where: { ...input },
    });
    await follower.destroy();
  }
}
