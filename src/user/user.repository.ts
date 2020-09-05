import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { RegisterDto } from "./dto/register.dto";
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger("UserRepository");

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, fname, lname, password } = registerDto;

    const user = this.create();
    user.email = email;
    user.fname = fname;
    user.lname = lname;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      this.logger.debug(
        `New user created (${user.fname} ${user.lname}, ${user.email})`,
      );
    } catch (error) {
      if (error.code === "23505") {
        // duplicate username
        throw new ConflictException("Email already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<string> {
    const { email, password } = userCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
