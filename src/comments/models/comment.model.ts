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
export class Comment {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets?: Tweet[];

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  @Field()
  body: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
