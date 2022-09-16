import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gift } from './gift.entity';
import { User } from './user.entity';

@Entity('Redeems')
export class Redeem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  qty: number;

  @ManyToOne(() => Gift, (gift) => gift.redeems)
  @JoinColumn()
  gift: Gift;

  @ManyToOne(() => User, (user) => user.redeems)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
