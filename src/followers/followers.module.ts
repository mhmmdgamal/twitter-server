import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from './models/follower.model';
import { FollowersResolver } from './followers.resolver';
import { FollowersService } from './followers.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Follower]),
    forwardRef(() => UsersModule),
  ],
  providers: [FollowersResolver, FollowersService],
})
export class FollowersModule { }
