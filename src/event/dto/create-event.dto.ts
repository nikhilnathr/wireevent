import { IsString, Length, IsDateString } from "class-validator";
import { DateInRangeOf } from "../validators/date-in-range-of.validator";
import { DateWrt } from "../validators/date-wrt.validator";

export class CreateEventDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(20, 10000)
  description: string;

  @IsDateString()
  @DateInRangeOf(
    {
      min: new Date(),
      max: new Date(1000 * 60 * 60 * 24 * 365 + new Date().valueOf()),
    },
    { message: "startTime should be within 1 year from current date" },
  )
  startTime: Date;

  @IsDateString()
  @DateInRangeOf(
    {
      min: new Date(),
      max: new Date(1000 * 60 * 60 * 24 * 365 + new Date().valueOf()),
    },
    { message: "endTime should be within 1 year from current date" },
  )
  @DateWrt(
    { propertyName: "startTime", range: 10 },
    { message: "endTime should be 10 days within the startTime" },
  )
  endTime: Date;
}
