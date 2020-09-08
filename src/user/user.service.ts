import {
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { UpdateUserDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { UserRole } from "./user-role.enum";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class UserService {
  private logger = new Logger("UserService");

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    return this.userRepository.register(registerDto);
  }

  async login(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      userCredentialsDto,
    );
    if (!email) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    let user = await this.getUserById(id, currentUser);

    // check if fname and lname not null
    if (updateUserDto.fname === null || updateUserDto.lname === null) {
      throw new BadRequestException(["fname and lname must not be empty"]);
    }

    user = Object.assign(user, updateUserDto);
    await user.save();
    this.logger.debug(`Updated user ${id}`);
    return user;
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
    currentUser: User,
  ): Promise<void> {
    let user = await this.getUserById(id, currentUser);

    if (!(await user.validatePassword(updatePasswordDto.oldPassword))) {
      throw new BadRequestException([
        "Unable to update user password. Invalid old password",
      ]);
    }

    return this.userRepository.updateUserPassword(
      user,
      updatePasswordDto.newPassword,
    );
  }

  async getUserById(id: number, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (
      !(
        user &&
        (user.id === currentUser.id ||
          currentUser.role in [UserRole.ADMIN, UserRole.MANAGER])
      )
    ) {
      this.logger.debug(
        `${currentUser.email}(${currentUser.id}) tried to update user ${id}`,
      );
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
