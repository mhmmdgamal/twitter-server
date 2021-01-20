import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from './models/follower.model';
import { FollowersResolver } from './followers.resolver';
import { FollowersService } from './followers.service';

@Module({
  imports: [SequelizeModule.forFeature([Follower])],
  providers: [FollowersResolver, FollowersService],
})
export class FollowersModule { }
