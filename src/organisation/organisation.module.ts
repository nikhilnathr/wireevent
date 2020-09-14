import { Module } from "@nestjs/common";
import { OrganisationController } from "./organisation.controller";
import { OrganisationService } from "./organisation.service";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationRepository } from "./organisation.repository";

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationRepository]), UserModule],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
