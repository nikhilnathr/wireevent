import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { OrganisationModule } from "./organisation/organisation.module";
import { EventModule } from "./event/event.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    OrganisationModule,
    EventModule,
  ],
})
export class AppModule {}
