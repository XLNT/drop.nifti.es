import { makeMessage } from 'common/lib/message';
import { Wallet } from 'ethers';

import { digestify, recoverAddress } from './proof';

const signer = Wallet.createRandom();

const message = makeMessage(signer.address);

it('should be able to recover an address from a known message', async () => {
  const signature = await signer.signMessage(message);

  const recovered = recoverAddress(digestify(message), signature);
  expect(recovered).toEqual(signer.address);
});

export {};
