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
  Query,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { GetUser } from "src/user/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "../event/event.entity";
import { PaginationDto } from "./dto/pagination.dto";
import { PaginatedEventsDto } from "./dto/paginated-events.dto";

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

  @Get()
  getAllEvents(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<PaginatedEventsDto> {
    return this.eventService.getAllEvents({
      ...paginationDto,
      limit: paginationDto.limit,
    });
  }
}
