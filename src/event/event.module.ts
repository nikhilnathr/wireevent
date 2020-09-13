import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { EventRepository } from "./event.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { OrganisationModule } from "src/organisation/organisation.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRepository]),
    UserModule,
    OrganisationModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
