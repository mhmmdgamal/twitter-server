import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table
@ObjectType()
export class Tweet extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  })
  @Field(type => ID)
  id: string;

  @Column
  @Field()
  body: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  @Field(type => User)
  user?: User;
}
