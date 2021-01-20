import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentInput } from './inputs/create-comment.input';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) { }

  async create(comment: CreateCommentInput): Promise<Comment> {
    return await this.commentModel.create({ ...comment });
  }
}
