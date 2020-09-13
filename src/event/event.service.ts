import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EventRepository } from "./event.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "../event/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { OrganisationService } from "src/organisation/organisation.service";

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
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    organiserId: number,
  ): Promise<Event> {
    const organiser = await this.organisationService.getOrganisationById(
      organiserId,
    );

    return this.eventRepository.createEvent(createEventDto, organiser);
  }
}
