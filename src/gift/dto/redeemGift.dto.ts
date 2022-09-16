import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class RedeemGiftDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  qty: number;
}
