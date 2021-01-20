import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthRegisterInput } from 'src/auth/inputs/auth.register.input';
import { Comment } from 'src/comments/models/comment.model';
import { Tweet } from 'src/tweets/models/tweet.model';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel.findAll({
      include: [Tweet, Comment],
    });
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({
      where: {
        email,
      },
      include: [Tweet],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} doesn't exist`);
    }

    return user;
  }

  async checkIfExists(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({
      where: {
        email,
      },
      include: [Tweet],
    });

    if (!user) {
      return user;
    }
    return null;
  }

  async create(input: AuthRegisterInput): Promise<User> {
    return await this.userModel.create(input);
  }

  async remove(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    await user.destroy();
  }

  async follow(email: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return await user.update({ followers: user.followers + 1 });
  }
}
