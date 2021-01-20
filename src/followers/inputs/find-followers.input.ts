import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class FindFollowersInput {
  @IsNotEmpty()
  @Field(() => ID)
  userId: string;
}
