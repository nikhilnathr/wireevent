import { Event } from "../event.entity";

export class PaginatedEventsDto {
  data: Event[];
  page: number;
  limit: number;
  totalCount: number;
}
