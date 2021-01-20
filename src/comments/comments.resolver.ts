import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';
import { Comment } from './models/comment.model';

@Resolver()
@UseGuards(GqlAurhGuard)
export class CommentsResolver {
  constructor(private readonly commentService: CommentsService) { }

  @Mutation(() => Comment)
  async addComment(@Args('input') input: CreateCommentInput) {
    return await this.commentService.create(input);
  }

  @Mutation(() => Comment)
  async updateComment(@Args('input') input: UpdateCommentInput) {
    return await this.commentService.update(input);
  }
}
