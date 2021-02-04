import type { Bytes } from 'ethers';
import { arrayify, hashMessage, recoverAddress as ethersRecoverAddress } from 'ethers/lib/utils';

export function digestify(message: string) {
  const messageHash = hashMessage(message);
  const messageHashBytes = arrayify(messageHash);

  return messageHashBytes;
}

export function recoverAddress(digest: string | Bytes, signature: string) {
  return ethersRecoverAddress(digest, signature);
}
