import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class FindUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  username: string;
}
