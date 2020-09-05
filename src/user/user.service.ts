import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

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
}
