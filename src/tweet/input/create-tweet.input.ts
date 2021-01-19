import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTweetInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  userId: string;
}
