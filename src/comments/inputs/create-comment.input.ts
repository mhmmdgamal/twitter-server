import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

@ArgsType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;

  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  userId: string;

  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  tweetId: string;
}
