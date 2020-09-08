import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { GetUser } from "./get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.userService.register(registerDto);
  }

  @UseGuards(AuthGuard())
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() currentUser: User,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto, currentUser);
  }

  @Post("login")
  login(
    @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.login(userCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Patch(":id/password")
  updatePassword(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
    @GetUser() currentUser: User,
  ): Promise<void> {
    return this.userService.updatePassword(id, updatePasswordDto, currentUser);
  }
}
