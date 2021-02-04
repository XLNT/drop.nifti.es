import { AnySchemaObject } from 'ajv';

export enum GrantType {
  Mint = 'mint',
  Transfer = 'transfer',
}

export interface MintDropGrant {
  type: GrantType.Mint;
  ids: number[];
  amounts: number[];
  data?: string;
}

export interface TransferDropGrant {
  type: GrantType.Transfer;
  from: string;
  ids: number[];
  amounts: number[];
  data?: string;
}

export type DropGrant = MintDropGrant | TransferDropGrant;

const MintDropGrantSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    type: { type: 'string', enum: Object.values(GrantType) },
    ids: { type: 'array', items: { type: 'number' }, minItems: 1 },
    amounts: { type: 'array', items: { type: 'number', minimum: 0 }, minItems: 1 },
    data: { type: 'string' },
  },
  required: ['type', 'ids', 'amounts'],
  additionalProperties: false,
};

const TransferDropGrantSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    type: { type: 'string', enum: Object.values(GrantType) },
    from: { type: 'string' },
    ids: { type: 'array', items: { type: 'number' }, minItems: 1 },
    amounts: { type: 'array', items: { type: 'number', minimum: 0 }, minItems: 1 },
    data: { type: 'string' },
  },
  required: ['type', 'from', 'ids', 'amounts'],
  additionalProperties: false,
};

// TODO: JSONSchemaType<DropGrant>
export const DropGrantSchema: AnySchemaObject = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  anyOf: [MintDropGrantSchema, TransferDropGrantSchema],
};
