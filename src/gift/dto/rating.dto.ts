import { IsNumber, Max, Min } from 'class-validator';

export class RatingDto {
  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @Min(0.5)
  @Max(5)
  rating: number;
}
