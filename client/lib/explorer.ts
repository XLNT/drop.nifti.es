export function explorerBaseURI(chainId: string) {
  switch (chainId) {
    case '1':
      return `https://etherscan.io`;
    case '137':
      return `https://polygonscan.com`;
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}

export function explorerName(chainId: string) {
  switch (chainId) {
    case '1':
      return `Etherscan`;
    case '137':
      return `Polygonscan`;
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
