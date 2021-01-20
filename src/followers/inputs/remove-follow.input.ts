import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RemoveFollowInput {
  @IsNotEmpty()
  @Field(() => ID)
  userId: string;

  @IsNotEmpty()
  @Field()
  followerId: string;
}
