import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field()
  body: string;

  @Field()
  userId: string;
}
