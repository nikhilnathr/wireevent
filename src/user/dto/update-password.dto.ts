import { Length, Matches, IsNotEmpty } from "class-validator";

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @Length(8, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  newPassword: string;
}
