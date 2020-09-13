import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "./event.entity";
import { Organisation } from "src/organisation/organisation.entity";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  private logger = new Logger("EventRepository");

  async createEvent(
    createEventDto: CreateEventDto,
    organisation: Organisation,
  ) {
    const { name, description, startTime, endTime } = createEventDto;

    const event = this.create();
    event.name = name;
    event.description = description;
    event.startTime = startTime;
    event.endTime = endTime;
    event.organisation = organisation;

    try {
      await event.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a event ${JSON.stringify(createEventDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete event.organisation;

    return event;
  }
}
