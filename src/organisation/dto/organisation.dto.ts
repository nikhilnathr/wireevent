import { IsString, Length, IsEmail, IsOptional, IsUrl } from "class-validator";

export class OrganisationDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  @Length(3, 40)
  email: string;

  @IsOptional()
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  @Length(3, 40)
  website: string;

  @IsOptional()
  @IsEmail()
  @Length(3, 40)
  phone: string;
}
