import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class FindTweetInput {
  @IsNotEmpty()
  @Field(() => ID)
  id: string;
}
