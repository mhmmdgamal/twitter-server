import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  commentId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;
}
