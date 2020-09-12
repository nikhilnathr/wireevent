import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { OrganisationDto } from "./dto/organisation.dto";
import { OrganisationRepository } from "./organisation.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "./organisation.entity";

@Injectable()
export class OrganisationService {
  private logger = new Logger("OrganisationService");

  constructor(
    @InjectRepository(OrganisationRepository)
    private organisationRepository: OrganisationRepository,
  ) {}

  async getOrganisationById(id: number): Promise<Organisation> {
    const organisation = await this.organisationRepository.findOne({
      where: { id },
    });

    if (!organisation) {
      throw new NotFoundException(`Organisation with id ${id} not found`);
    }

    return organisation;
  }

  async create(
    OrganisationDto: OrganisationDto,
    owner: User,
  ): Promise<Organisation> {
    return this.organisationRepository.createOrganisation(
      OrganisationDto,
      owner,
    );
  }
}
