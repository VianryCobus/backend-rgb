import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift, Rating, Redeem, User } from 'src/models';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gift, Redeem, Rating])],
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}
