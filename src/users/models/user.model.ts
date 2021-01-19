import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UUIDV4 } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Tweet } from 'src/tweets/models/tweet.model';

@Table
@ObjectType()
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  })
  @Field(() => ID)
  id: string;

  @Column({ allowNull: false })
  password: string;

  @Column
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @HasMany(() => Tweet)
  @Field(() => [Tweet])
  tweets?: Tweet[];

  @Column({ defaultValue: 0 })
  @Field(() => Int)
  followers?: number;

  @Field()
  token?: string;
}
