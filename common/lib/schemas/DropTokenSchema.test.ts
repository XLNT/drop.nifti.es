import { createValidator, ValidationError } from '../validation';
import { GrantType } from './DropGrantSchema';
import { DropToken, DropTokenSchema } from './DropTokenSchema';

const valid: DropToken = {
  iss: 'hello',
  grant: {
    type: GrantType.Mint,
    ids: [0],
    amounts: [1],
  },
};

const invalid: Partial<DropToken>[] = [{}, { iss: 'hello' }];

const validate = createValidator(DropTokenSchema);

it('should allow valid data', () => {
  expect(validate(valid)).toEqual(true);
});

it('should fail invalid data', () => {
  invalid.forEach((data) => expect(() => validate(data)).toThrow(ValidationError));
});

export {};
