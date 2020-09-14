import { IsOptional, IsNumber, Min, Max } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  limit: number;
}
