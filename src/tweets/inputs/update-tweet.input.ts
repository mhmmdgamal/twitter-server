import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateTweetInput {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  @Field(() => ID)
  tweetId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;
}
