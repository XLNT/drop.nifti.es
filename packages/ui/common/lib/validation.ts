import Ajv, { AnySchemaObject, ValidateFunction } from 'ajv';
import { isAddress, isHexString } from 'ethers/lib/utils';
import { decode } from 'jsonwebtoken';

export class ValidationError<T> extends Error {
  constructor(public errors?: ValidateFunction<T>['errors']) {
    super('ValidationError');
    Object.setPrototypeOf(this, ValidationError.prototype);
    Error.captureStackTrace(this, ValidationError);
  }
}

const ajv = new Ajv();

ajv.addFormat('jwt', (value) => decode(value) !== null);
ajv.addFormat('address', (value) => isAddress(value));
ajv.addFormat('hex', (value) => isHexString(value));
ajv.addFormat('signature', (value) => isHexString(value));

// standard validate function that captures ajv.compile, and throws if there are errors
export function createValidator<TData>(schema: AnySchemaObject) {
  const validator = ajv.compile(schema);

  return function validate(data: unknown): data is TData {
    const valid = validator(data);
    if (!valid) throw new ValidationError(validator.errors);
    return true;
  };
}
