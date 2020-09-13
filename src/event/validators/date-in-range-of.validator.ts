import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

export function DateInRangeOf(
  property: { min: Date; max: Date },
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: DateInRangeOfConstraint,
    });
  };
}

@ValidatorConstraint({ name: "DateInRangeOf" })
export class DateInRangeOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [{ min, max }] = args.constraints;
    const valueDate = new Date(value);
    return valueDate < max && valueDate > min;
  }
}
