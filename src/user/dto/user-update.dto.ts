import {
  IsString,
  Length,
  IsUrl,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 20)
  fname: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  lname: string;

  @IsOptional()
  @IsPhoneNumber("IN")
  phone: string;

  @IsOptional()
  @IsString()
  @Length(10, 40)
  address: string;

  @IsOptional()
  @IsString()
  @Length(3, 25)
  position: string;

  @IsOptional()
  @IsString()
  @Length(3, 40)
  institution: string;

  @IsOptional()
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  website: string;
}
