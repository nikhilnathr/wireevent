import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.userService.register(registerDto);
  }

  @Post("login")
  login(
    @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.login(userCredentialsDto);
  }
}
