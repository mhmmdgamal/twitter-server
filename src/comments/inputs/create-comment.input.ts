import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;

  @IsNotEmpty()
  @Field(() => ID)
  userId: string;

  @IsNotEmpty()
  @Field(() => ID)
  tweetId: string;
}
