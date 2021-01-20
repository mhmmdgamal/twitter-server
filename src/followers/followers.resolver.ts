import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { FindFollowInput } from './inputs/find-follow.input';
import { CreateFollowInput } from './inputs/create-follow.input';
import { Follower } from './models/follower.model';
import { FollowersService } from './followers.service';
import { RemoveFollowInput } from './inputs/remove-follow.input';

@Resolver()
@UseGuards(GqlAurhGuard)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) { }

  @Query(() => Follower)
  async userFollowers(@Args() input: FindFollowInput): Promise<Follower[]> {
    return await this.followersService.findUserFollowers(input.userId);
  }

  @Query(() => Follower)
  async userFollowings(@Args() input: FindFollowInput): Promise<Follower[]> {
    return await this.followersService.findUserFollowings(input.userId);
  }

  @Mutation(() => Follower)
  async followUser(@Args('input') input: CreateFollowInput): Promise<Follower> {
    return await this.followersService.create(input);
  }

  @Mutation(() => Follower)
  async unFollowUser(@Args('input') input: RemoveFollowInput) {
    await this.followersService.remove(input);
  }
}
