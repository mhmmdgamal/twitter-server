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
import { User } from 'src/user/model/user.model';

@Table
@ObjectType()
export class Tweet extends Model {
  @PrimaryKey
  @AllowNull(false)
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

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
