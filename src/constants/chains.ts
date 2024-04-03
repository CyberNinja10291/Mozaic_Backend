export const ETH_MAINNET: number = 1;
export const ARBITRUM: number = 42161;
export const FANTOM: number = 250;
export const POLYGON: number = 137;
export const BCS_MAINNET: number = 56;
export const AVALANCHE: number = 43114;
export const ARBITRUM_GOERLI: number = 421613;
export const AVALANCHE_FUJI: number = 43113;

export const SUPPORT_CHAINS = [ARBITRUM, FANTOM, POLYGON, BCS_MAINNET, AVALANCHE];

export const DEFAULT_CHAIN_ID = ARBITRUM;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const RPC_PROVIDERS = {
  [ETH_MAINNET]: ["https://rpc.ankr.com/eth"],
  [ARBITRUM]: ["https://arbitrum.meowrpc.com"],
  [FANTOM]: ["https://fantom.publicnode.com"],
  [POLYGON]: ["https://polygon-bor.publicnode.com"],
  [BCS_MAINNET]: [
    "https://bsc-dataseed.binance.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
    "https://bsc-dataseed2.defibit.io",
    "https://bsc-dataseed3.defibit.io",
    "https://bsc-dataseed4.defibit.io",
    "https://bsc-dataseed2.ninicoin.io",
    "https://bsc-dataseed3.ninicoin.io",
    "https://bsc-dataseed4.ninicoin.io",
    "https://bsc-dataseed1.binance.org",
    "https://bsc-dataseed2.binance.org",
    "https://bsc-dataseed3.binance.org",
    "https://bsc-dataseed4.binance.org",
  ],
  [AVALANCHE]: ["https://api.avax.network/ext/bc/C/rpc"],
};

export function getExplorerUrl(chainId: number) {
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  } else if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  } else if (chainId === BCS_MAINNET) {
    return "https://bscscan.com/";
  } else if (chainId === ARBITRUM) {
    return "https://arbiscan.io/";
  } else if (chainId === AVALANCHE) {
    return "https://snowtrace.io/";
  }
  return "https://etherscan.io/";
}