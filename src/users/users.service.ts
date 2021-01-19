import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthRegisterInput } from 'src/auth/dto/auth.register.input';
import { Tweet } from 'src/tweets/models/tweet.model';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: [Tweet] });
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        username,
      },
      include: [Tweet],
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
      include: [Tweet],
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.findOne(username);
  }

  async create(input: AuthRegisterInput): Promise<User> {
    return this.userModel.create(input);
  }

  async remove(username: string): Promise<void> {
    const user = await this.findOne(username);
    await user.destroy();
  }

  async follow(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }
    user.followers += 1;
    user.save();

    return user;
  }
}
