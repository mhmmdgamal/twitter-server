import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthLoginInput } from './dto/auth.login.input';
import { AuthRegisterInput } from './dto/auth.register.input';
import { AuthService } from './auth.service';
import { User } from 'src/users/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  login(@Args('input') input: AuthLoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => User)
  register(@Args('input') input: AuthRegisterInput) {
    return this.authService.register(input);
  }
}
