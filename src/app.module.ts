import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { OrganisationModule } from "./organisation/organisation.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    OrganisationModule,
  ],
})
export class AppModule {}
