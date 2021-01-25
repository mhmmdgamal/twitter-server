import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { CreateFollowInput } from './inputs/create-follow.input';
import { RemoveFollowInput } from './inputs/remove-follow.input';
import { Follower } from './models/follower.model';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower)
    private followerModel: typeof Follower,
    private userService: UsersService,
  ) { }

  async findUserFollowers(userId: string): Promise<Follower[]> {
    const followers: Follower[] = await this.followerModel.findAll({
      include: [User],
      where: { userId },
    });

    return followers;
  }

  async findUserFollowings(userId: string): Promise<Follower[]> {
    const followings: Follower[] = await this.followerModel.findAll({
      include: [User],
      where: { followerId: userId },
    });

    return followings;
  }

  async create(input: CreateFollowInput): Promise<Follower> {
    const follower: Follower = await this.followerModel.findOne({
      where: { ...input },
    });

    if (follower) {
      throw new Error('You are already following this person');
    }

    await this.userService.increaseFollowersCount(input.userId);
    await this.userService.increaseFollowingsCount(input.followerId);
    return await this.followerModel.create({ ...input });
  }

  async remove(input: RemoveFollowInput) {
    const follower: Follower = await this.followerModel.findOne({
      where: { ...input },
    });

    if (!follower) {
      throw new Error('You are not following this person');
    }

    await this.userService.decreaseFollowersCount(input.userId);
    await this.userService.decreaseFollowingsCount(input.followerId);
    await follower.destroy();
    return true;
  }

  async isFollowing(input: RemoveFollowInput) {
    const follower: Follower = await this.followerModel.findOne({
      where: { userId: input.userId, followerId: input.followerId },
    });

    return follower ? true : false;
  }
}
