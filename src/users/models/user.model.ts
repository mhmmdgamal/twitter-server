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

  @Column
  @Field()
  @AllowNull(false)
  username: string;

  @Column
  @Unique
  @AllowNull(false)
  @Field()
  email: string;

  @Default(DataType.INTEGER)
  @Column({ defaultValue: 0 })
  @Field(() => Int)
  followers: number;

  @HasMany(() => Tweet)
  @Field(() => [Tweet])
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
