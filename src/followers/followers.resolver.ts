import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { FindFollowersInput } from './inputs/find-followers.input';
import { CreateFollowerInput } from './inputs/create-follower.input';
import { Follower } from './models/follower.model';
import { FollowersService } from './followers.service';
import { RemoveFollowerInput } from './inputs/remove-follower.input';

@Resolver()
@UseGuards(GqlAurhGuard)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) { }

  @Query(() => Follower)
  async userFollowers(@Args() input: FindFollowersInput): Promise<Follower[]> {
    return await this.followersService.findUserFollowers(input.userId);
  }

  @Mutation(() => Follower)
  async followUser(
    @Args('input') input: CreateFollowerInput,
  ): Promise<Follower> {
    return await this.followersService.create(input);
  }

  @Mutation(() => Follower)
  async unFollowUser(@Args('input') input: RemoveFollowerInput) {
    await this.followersService.remove(input);
  }
}
