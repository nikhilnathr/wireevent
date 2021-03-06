import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "../event/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { OrganisationService } from "src/organisation/organisation.service";
import { User } from "src/user/user.entity";
import { PaginationDto } from "./dto/pagination.dto";
import { PaginatedEventsDto } from "./dto/paginated-events.dto";

@Injectable()
export class EventService {
  private logger = new Logger("EventService");

  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    private organisationService: OrganisationService,
  ) {}

  async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ["organisation"],
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async getAllEvents(
    paginationDto: PaginationDto,
  ): Promise<PaginatedEventsDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.eventRepository.count();

    const products = await this.eventRepository.find({
      relations: ["organisation"],
      skip: skippedItems,
      take: paginationDto.limit,
      order: { createdAt: "DESC" },
    });

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products,
    };
  }

  async createEvent(
    createEventDto: CreateEventDto,
    organisationId: number,
    user: User,
  ): Promise<Event> {
    const organisation = await this.organisationService.getOrganisationById(
      organisationId,
      user,
    );

    return this.eventRepository.createEvent(createEventDto, organisation);
  }
}
