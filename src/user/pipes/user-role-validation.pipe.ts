import { PipeTransform, BadRequestException } from "@nestjs/common";
import { UserRole } from "../user-role.enum";

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowerRoles = [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isRoleValid(status: any) {
    const idx = this.allowerRoles.indexOf(status);
    return idx !== -1;
  }
}
