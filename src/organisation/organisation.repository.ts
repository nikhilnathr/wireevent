import { Repository, EntityRepository } from "typeorm";
import { User } from "../user/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { OrganisationDto } from "./dto/organisation.dto";
import { Organisation } from "./organisation.entity";

@EntityRepository(Organisation)
export class OrganisationRepository extends Repository<Organisation> {
  private logger = new Logger("OrganisationRepository");

  async createOrganisation(
    organisationDto: OrganisationDto,
    owner: User,
  ): Promise<Organisation> {
    const { name, email, website, phone } = organisationDto;

    const organisation = new Organisation();
    organisation.name = name;
    organisation.email = email;
    organisation.website = website;
    organisation.phone = phone;
    organisation.owner = owner;

    try {
      await organisation.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a organisation for user "${owner.email} (${
          owner.id
        })", Data: ${JSON.stringify(organisationDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete organisation.owner;

    return organisation;
  }
}
