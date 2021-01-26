import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';

@InputType()
export class CreateTweetInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;

  @IsNotEmpty()
  @Field(() => ID)
  userId: string;
}
