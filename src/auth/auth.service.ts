import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from '../users/users.service';
import { AuthHelper } from './auth.helper';
import { AuthRegisterInput } from './dto/auth.register.input';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(input: AuthRegisterInput): Promise<User> {
    const validatedUser = await this.validateCredentials(input);

    validatedUser.token = this.signToken(validatedUser.username);

    return validatedUser;
  }

  private async validateCredentials(input: AuthRegisterInput) {
    const userFound = await this.userService.findUserByEmail(input.email);
    if (!userFound) {
      throw new NotFoundException(
        `User with email ${input.email} doesn't exist`,
      );
    }

    const passwordValid = await AuthHelper.validate(
      input.password,
      userFound.password,
    );

    if (!passwordValid) {
      throw new Error(`Invalid Password`);
    }
    return userFound;
  }

  async register(input: AuthRegisterInput) {
    const userFound = await this.userService.findUserByEmail(input.email);
    if (userFound) {
      throw new BadRequestException(
        `Can not register with email ${input.email}`,
      );
    }

    input.password = await AuthHelper.hash(input.password);

    const createdUser = await this.userService.create(input);

    createdUser.token = this.signToken(createdUser.username);

    return createdUser;
  }

  signToken(email: string) {
    const payload: JwtDto = { email: email };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
