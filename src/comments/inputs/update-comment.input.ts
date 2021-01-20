import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class UpdateCommentInput {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  commentId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;
}
