import { Min, Max, IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly page: number = 1;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Max(10)
  @Min(1)
  readonly limit: number = 10;
}
