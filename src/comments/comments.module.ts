import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule { }
