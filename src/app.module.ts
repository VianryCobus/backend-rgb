import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/config/typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import mysqlCobsConfig from './config/mysql_connection';
import databaseConfig from './config/ormconfig_mysql';
import { GiftModule } from './gift';
import { IpVisitMiddleware } from './utils/middleware';
import { HistoryLoginConsumer } from './utils/queue';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(mysqlCobsConfig),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'backend-rgb',
    }),
    AuthModule,
    GiftModule,
  ],
  controllers: [AppController],
  providers: [AppService, HistoryLoginConsumer],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpVisitMiddleware).forRoutes('auth', 'gifts');
  }
}
