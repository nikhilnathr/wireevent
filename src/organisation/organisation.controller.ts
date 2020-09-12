import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UsePipes,
  Logger,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { OrganisationService } from "./organisation.service";
import { OrganisationDto } from "./dto/organisation.dto";
import { User } from "src/user/user.entity";
import { GetUser } from "src/user/get-user.decorator";
import { Organisation } from "./organisation.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller("organisation")
export class OrganisationController {
  private logger = new Logger("OrganisationController");

  constructor(private organisationService: OrganisationService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  create(
    @Body() organisationDto: OrganisationDto,
    @GetUser() owner: User,
  ): Promise<Organisation> {
    this.logger.verbose(
      `User "${
        owner.email
      }" creating a new organisation. Data: ${JSON.stringify(organisationDto)}`,
    );
    return this.organisationService.create(organisationDto, owner);
  }

  @Get(":id")
  getOrganisationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Organisation> {
    return this.organisationService.getOrganisationById(id);
  }
}
