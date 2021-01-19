import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@UseGuards(GqlAurhGuard)
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users: User[] = await this.usersService.findAll();
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  @Query(() => User)
  async user(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<User> {
    const user: User = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Mutation(() => User)
  async followUser(@Args({ name: 'email', type: () => String }) email: string) {
    return this.usersService.follow(email);
  }
}
