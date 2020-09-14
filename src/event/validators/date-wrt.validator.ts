import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

export function DateWrt(
  property: { propertyName: string; range: number },
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: DateWrtConstraint,
    });
  };
}

@ValidatorConstraint({ name: "DateWrt" })
export class DateWrtConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [{ propertyName: relatedPropertyName, range }] = args.constraints;
    const relatedValueDate = new Date(
      (args.object as any)[relatedPropertyName],
    ).valueOf();
    const valueDate = new Date(value).valueOf();
    return (
      valueDate > relatedValueDate &&
      relatedValueDate + 1000 * 60 * 60 * 24 * range >= valueDate
    );
  }
}
