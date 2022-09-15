import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class PostGiftDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(999999999)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(999999999)
  stock: number;

  @IsString()
  @IsNotEmpty()
  image: string;
}
