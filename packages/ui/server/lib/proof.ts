import { Bytes, utils } from 'ethers';

export function digestify(message: string) {
  const messageHash = utils.hashMessage(message);
  const messageHashBytes = utils.arrayify(messageHash);

  return messageHashBytes;
}

export function recoverAddress(digest: string | Bytes, signature: string) {
  return utils.recoverAddress(digest, signature);
}
