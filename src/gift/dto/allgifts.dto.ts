import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class AllGiftsDto {
  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort: string;

  // @IsNumber()
  @IsOptional()
  page: number;

  // @IsNumber()
  @IsOptional()
  limit: number;
}
