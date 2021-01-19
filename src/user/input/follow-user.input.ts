import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class FollowUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;
}
