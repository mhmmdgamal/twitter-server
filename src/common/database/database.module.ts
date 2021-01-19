import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'twitter',
      password: 'twitter',
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule { }
