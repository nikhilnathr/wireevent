import { IsNotEmpty } from "class-validator";

export class UserCredentialsDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
