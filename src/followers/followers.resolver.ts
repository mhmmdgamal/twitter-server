import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
// import { CreateFollowerInput } from './inputs/create-follower.input';
// import { FindFollowerInput } from './inputs/find-follower.input';
// import { UpdateFollowerInput } from './inputs/update-follower.input';
import { Follower } from './models/follower.model';
import { FollowersService } from './followers.service';

@Resolver()
@UseGuards(GqlAurhGuard)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) { }

  //   @Query(() => [Follower])
  //   async followers(): Promise<Follower[]> {
  //     return await this.followersService.findAll();
  //   }

  //   @Query(() => Follower)
  //   async follower(@Args() input: FindFollowerInput): Promise<Follower> {
  //     return await this.followersService.findOne(input.id);
  //   }

  //   @Mutation(() => Follower)
  //   async createFollower(@Args('input') input: CreateFollowerInput) {
  //     return await this.followersService.create(input);
  //   }

  //   @Mutation(() => Follower)
  //   async updateFollower(@Args('input') input: UpdateFollowerInput) {
  //     return await this.followersService.update(input);
  //   }
}
