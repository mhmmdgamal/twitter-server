import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;

  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  tweetId: string;
}
