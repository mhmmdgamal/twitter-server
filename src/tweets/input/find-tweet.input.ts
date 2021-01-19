import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindTweetInput {
  @Field()
  id: string;
}
