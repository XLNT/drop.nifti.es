import { AnySchemaObject } from 'ajv';

export interface DropToken {
  iss: string;
  grant: unknown;
}

export const DropTokenSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    iss: { type: 'string' },
    grant: { type: 'object' },
  },
  required: ['iss'],
};
