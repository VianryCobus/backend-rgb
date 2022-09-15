import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PatchGiftDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(999999999)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(999999999)
  stock: number;

  @IsString()
  @IsOptional()
  image: string;
}
