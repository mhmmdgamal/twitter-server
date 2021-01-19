import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Tweet } from 'src/tweets/models/tweet.model';
import { User } from 'src/users/models/user.model';

@Table
@ObjectType()
export class Comment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  @Field()
  body: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  @Field(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => Tweet)
  @Column({ type: DataType.UUID })
  tweetId: string;

  @BelongsTo(() => Tweet)
  @Field(() => Tweet)
  tweet: Tweet;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
