import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) { }

  async create(input: CreateCommentInput): Promise<Comment> {
    return await this.commentModel.create({ ...input });
  }

  async update(input: UpdateCommentInput): Promise<Comment> {
    const comment: Comment = await this.findOne(input.commentId);
    return await comment.update({ ...input });
  }

  async findOne(id: string): Promise<Comment> {
    const comment: Comment = await this.commentModel.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
  }
}
