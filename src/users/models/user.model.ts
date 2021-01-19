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

  @Default(0)
  @Column
  @Field(() => Int)
  followers: number;

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets?: Tweet[];

  @Field()
  token?: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
