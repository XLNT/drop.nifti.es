import { createValidator, ValidationError } from '../validation';
import {
  DropGrant,
  DropGrantSchema,
  GrantType,
  MintDropGrant,
  TransferDropGrant,
} from './DropGrantSchema';

const mint: MintDropGrant = {
  type: GrantType.Mint,
  ids: ['0x0'],
  amounts: ['0x1'],
  assetType: 'eip155:1/erc1155:0x28959cf125ccb051e70711d0924a62fb28eaf186',
};

const mintWithData: MintDropGrant = {
  ...mint,
  data: 'some data',
};

const transfer: TransferDropGrant = {
  type: GrantType.Transfer,
  from: '0x0',
  ids: ['0x0'],
  amounts: ['0x1'],
  assetType: 'eip155:1/erc1155:0x28959cf125ccb051e70711d0924a62fb28eaf186',
};

const transferWithData = {
  ...transfer,
  data: 'some data',
};

const valid: DropGrant[] = [mint, mintWithData, transfer, transferWithData];

const invalid: Partial<DropGrant>[] = [
  { type: GrantType.Mint },
  { type: GrantType.Mint, ids: [] },
  { type: GrantType.Mint, ids: ['0x1'], amounts: [] },
  { type: GrantType.Mint, ids: ['0x1'], amounts: ['0x0'] },
  //
  { type: GrantType.Transfer },
  { type: GrantType.Transfer, ids: [] },
  { type: GrantType.Transfer, ids: ['0x1'], amounts: [] },
  { type: GrantType.Transfer, ids: ['0x1'], amounts: ['0x0'] },
  { type: GrantType.Transfer, from: '', ids: ['0x1'], amounts: ['0x0'] },
];

const validate = createValidator(DropGrantSchema);

it('should allow valid data', () => {
  valid.forEach((data) => expect(validate(data)).toEqual(true));
});

it('should fail invalid data', () => {
  invalid.forEach((data) => expect(() => validate(data)).toThrow(ValidationError));
});

export {};
