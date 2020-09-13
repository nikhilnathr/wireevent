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
import { User } from "src/user/user.entity";
import { GetUser } from "src/user/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "../event/event.entity";

@Controller("event")
export class EventController {
  private logger = new Logger("OrganisationController");

  constructor(private eventService: EventService) {}

  @Post("org/:oranisationId")
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createEvent(
    @GetUser() user: User,
    @Param("oranisationId", ParseIntPipe) organisationId: number,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.createEvent(createEventDto, organisationId, user);
  }

  @Get(":id")
  getEventById(@Param("id", ParseIntPipe) id: number): Promise<Event> {
    return this.eventService.getEventById(id);
  }
}
