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

@Entity('Ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float',
    nullable: true,
    default: 0,
  })
  rating: number;

  @ManyToOne(() => Gift, (gift) => gift.ratings)
  @JoinColumn()
  gift: Gift;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
