import { IsString, Length, Matches, IsEmail } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  fname: string;

  @IsString()
  @Length(3, 40)
  lname: string;

  @IsEmail()
  @Length(3, 40)
  email: string;

  @Length(8, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;
}
