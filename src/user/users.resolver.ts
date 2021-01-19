import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guard/gql-auth.guard';
import { FindUserInput } from './input/find-user.input';
import { FollowUserInput } from './input/follow-user.input';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@UseGuards(GqlAurhGuard)
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args() input: FindUserInput): Promise<User> {
    return await this.usersService.findByEmail(input.email);
  }

  @Mutation(() => User)
  async followUser(@Args() input: FollowUserInput) {
    return this.usersService.follow(input.email);
  }
}
