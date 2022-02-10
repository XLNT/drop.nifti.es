import { AnySchemaObject } from 'ajv';

export interface DropGrant {
  id: string;
  amount: string;
  uri?: string;
}

export const DropGrantSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'string' },
    uri: { type: 'string' },
  },
  required: ['id', 'amount'],
  additionalProperties: false,
};
