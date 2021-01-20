import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CommentResolver } from './comments.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentService, CommentResolver],
})
export class CommentModule { }
