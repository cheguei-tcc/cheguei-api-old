import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { MongooseModule } from '@nestjs/mongoose';
import { KnexModule } from 'nestjs-knex';
import { AccountModule } from '../account/account.module';
@Module({
  imports: [
    KnexModule.forRoot({
      config: require('../../knexfile'),
    }),
    //MongooseModule.forRoot(process.env.MONGO_URI || 'localhost:2017/cheguei'),
    NotificationModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
