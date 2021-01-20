import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class FindFollowInput {
  @IsNotEmpty()
  @Field(() => ID)
  userId: string;
}
