import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class FindUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;
}
