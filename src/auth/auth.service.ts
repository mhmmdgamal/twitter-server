import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from '../users/users.service';
import { AuthHelper } from './auth.helper';
import { AuthRegisterInput } from './inputs/auth.register.input';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(input: AuthRegisterInput): Promise<User> {
    const validatedUser = await this.validateCredentials(input);

    return Object.assign(validatedUser, {
      token: this.signToken({ email: validatedUser.email }),
    });
  }

  private async validateCredentials(input: AuthRegisterInput) {
    const userFound = await this.userService.findByEmail(input.email);

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
    const userFound = await this.userService.checkIfExists(input.email);
    if (userFound) {
      throw new BadRequestException(
        `Can not register with email ${input.email}`,
      );
    }

    const password = await AuthHelper.hash(input.password);

    const createdUser = await this.userService.create({ ...input, password });

    return Object.assign(createdUser, {
      token: this.signToken({ email: createdUser.email }),
    });
  }

  signToken(payload: JwtDto) {
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string) {
    return await this.userService.findByEmail(email);
  }
}
