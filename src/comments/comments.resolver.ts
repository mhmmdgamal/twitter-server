import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAurhGuard } from 'src/auth/guards/gql-auth.guard';
import { CommentService } from './comments.service';
import { CreateCommentInput } from './inputs/create-comment.input';

@Resolver()
@UseGuards(GqlAurhGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Mutation(() => Comment)
  async addComment(@Args() input: CreateCommentInput) {
    return await this.commentService.create(input);
  }
}
