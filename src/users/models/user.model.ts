import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Tweet } from 'src/tweets/models/tweet.model';
import { Comment } from 'src/comments/models/comment.model';
import { Follower } from 'src/followers/models/follower.model';

@Table
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  @Field()
  username: string;

  @Unique
  @AllowNull(false)
  @Column
  @Field()
  email: string;

  @Field()
  token?: string;

  @Default(0)
  @Column
  @Field(() => Int)
  followersCount: number;

  @Default(0)
  @Column
  @Field(() => Int)
  followingsCount: number;

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets?: Tweet[];

  @HasMany(() => Comment)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @HasMany(() => Follower)
  @Field(() => [Follower], { nullable: true })
  followers?: Follower[];

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
