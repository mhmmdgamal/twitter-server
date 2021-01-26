import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'ec2-52-72-190-41.compute-1.amazonaws.com',
      port: 5432,
      database: 'dj7nodrfg1oho',
      username: 'cycpnffaiuqpdf',
      password:
        '0629c8d746351f6f7eb4b43ae027e9b671e23267022847437517ab8661595712',
      synchronize: true,
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
  ],
})
export class DatabaseModule { }
