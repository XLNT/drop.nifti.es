import { createValidator, ValidationError } from '../validation';
import { DropArguments, DropArgumentsSchema } from './DropArgumentsSchema';

const valid: DropArguments = {
  address: '0x0',
  token:
    'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkcm9wLm5pZnRpLmVzIiwiaXNzIjoib290bW0iLCJ0b2tlbklkIjowLCJpYXQiOjE2MTIyMjk3MDd9.LaazknNLGV8Tklet_zdfnQtVLtnm5oiX3Cfgc5Fr49iNQwVw5Id-1Dxwb8bOdNM9YVAif8v99vK6kpvz6du5Qg',
};

const invalid: Partial<DropArguments>[] = [{}, { address: '' }, { address: '', token: '' }];

const validate = createValidator(DropArgumentsSchema);

it('should allow valid data', () => {
  expect(validate(valid)).toEqual(true);
});

it('should fail invalid data', () => {
  invalid.forEach((data) => expect(() => validate(data)).toThrow(ValidationError));
});

export {};
