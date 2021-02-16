import { AnySchemaObject } from 'ajv';

export interface DropArguments {
  token: string;
  address: string;
  signature: string;
}

// TODO: JSONSchemaType<DropArguments>
export const DropArgumentsSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    token: { type: 'string', format: 'jwt' },
    address: { type: 'string', format: 'address' },
    signature: { type: 'string', format: 'signature' },
  },
  required: ['token', 'address', 'signature'],
  additionalProperties: false,
};
