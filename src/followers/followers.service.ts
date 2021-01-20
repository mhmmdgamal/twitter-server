import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/comments/models/comment.model';
import { User } from 'src/users/models/user.model';
// import { CreateFollowerInput } from './inputs/create-follower.input';
// import { UpdateFollowerInput } from './inputs/update-follower.input';
import { Follower } from './models/follower.model';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower)
    private followerModel: typeof Follower,
  ) { }

  // async findAll(): Promise<Follower[]> {
  //   const followers: Follower[] = await this.followerModel.findAll({
  //     include: [User, Comment],
  //   });

  //   if (!followers) {
  //     throw new NotFoundException();
  //   }
  //   return followers;
  // }

  // async findOne(id: string): Promise<Follower> {
  //   const follower: Follower = await this.followerModel.findOne({
  //     where: {
  //       id,
  //     },
  //     include: [User, Comment],
  //   });

  //   if (!follower) {
  //     throw new NotFoundException();
  //   }

  //   return follower;
  // }

  // async remove(id: string): Promise<void> {
  //   const follower = await this.findOne(id);
  //   await follower.destroy();
  // }

  // async create(input: CreateFollowerInput): Promise<Follower> {
  //   return await this.followerModel.create({ ...input });
  // }

  // async update(input: UpdateFollowerInput) {
  //   const follower: Follower = await this.findOne(input.followerId);
  //   return await follower.update({ ...input });
  // }
}
