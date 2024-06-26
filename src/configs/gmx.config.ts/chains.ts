export const BCS_MAINNET = 56;
export const BCS_TESTNET = 97;
export const ETH_MAINNET = 1;
export const AVALANCHE = 43114;
export const AVALANCHE_FUJI = 43113;
export const ARBITRUM: number = 42161;
export const ARBITRUM_GOERLI = 421613;
// export const FEES_HIGH_BPS = 50;
// export const DEFAULT_ALLOWED_SLIPPAGE_BPS = 30;

// // TODO take it from web3
export const DEFAULT_CHAIN_ID = ARBITRUM;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

// export const SUPPORTED_CHAIN_IDS = [ARBITRUM, AVALANCHE];

// if (isDevelopment()) {
//   SUPPORTED_CHAIN_IDS.push(AVALANCHE_FUJI, ARBITRUM_GOERLI);
// }

// export const IS_NETWORK_DISABLED = {
//   [ARBITRUM]: false,
//   [AVALANCHE]: false,
// };

export const CHAIN_NAMES_MAP = {
  [BCS_MAINNET]: "BSC",
  [BCS_TESTNET]: "BSC Testnet",
  [ARBITRUM_GOERLI]: "Arbitrum Goerli",
  [ARBITRUM]: "Arbitrum",
  [AVALANCHE]: "Avalanche",
  [AVALANCHE_FUJI]: "Avalanche Fuji",
};

// export const GAS_PRICE_ADJUSTMENT_MAP = {
//   [ARBITRUM]: "0",
//   [AVALANCHE]: "3000000000", // 3 gwei
// };

// export const MAX_GAS_PRICE_MAP = {
//   [AVALANCHE]: "200000000000", // 200 gwei
// };

export const HIGH_EXECUTION_FEES_MAP = {
  [ARBITRUM]: 3, // 3 USD
  [AVALANCHE]: 3, // 3 USD
  [AVALANCHE_FUJI]: 3, // 3 USD
};

// export const EXECUTION_FEE_MULTIPLIER_MAP = {
//   // if gas prices on Arbitrum are high, the main transaction costs would come from the L2 gas usage
//   // for executing positions this is around 65,000 gas
//   // if gas prices on Ethereum are high, than the gas usage might be higher, this calculation doesn't deal with that
//   // case yet
//   [ARBITRUM]: 65000,
//   // multiplier for Avalanche is just the average gas usage
//   [AVALANCHE]: 700000,
//   [AVALANCHE_FUJI]: 700000,
// };

export const EXECUTION_FEE_CONFIG_V2: {
  [chainId: number]: {
    shouldUseMaxPriorityFeePerGas: boolean;
    defaultBufferBps?: number;
  };
} = {
  [AVALANCHE]: {
    shouldUseMaxPriorityFeePerGas: true,
    defaultBufferBps: 1000, // 10%
  },
  [AVALANCHE_FUJI]: {
    shouldUseMaxPriorityFeePerGas: true,
    defaultBufferBps: 1000, // 10%
  },
  [ARBITRUM]: {
    shouldUseMaxPriorityFeePerGas: false,
    defaultBufferBps: 1000, // 10%
  },
  [ARBITRUM_GOERLI]: {
    shouldUseMaxPriorityFeePerGas: false,
    defaultBufferBps: 1000, // 10%
  },
};

// const constants = {
//   [BCS_MAINNET]: {
//     nativeTokenSymbol: "BNB",
//     defaultCollateralSymbol: "BUSD",
//     defaultFlagOrdersEnabled: false,
//     positionReaderPropsLength: 8,
//     v2: false,
//   },

//   [BCS_TESTNET]: {
//     nativeTokenSymbol: "BNB",
//     defaultCollateralSymbol: "BUSD",
//     defaultFlagOrdersEnabled: true,
//     positionReaderPropsLength: 8,
//     v2: false,
//   },

//   [ARBITRUM_GOERLI]: {
//     nativeTokenSymbol: "ETH",
//     wrappedTokenSymbol: "WETH",
//     defaultCollateralSymbol: "USDC",
//     defaultFlagOrdersEnabled: false,
//     positionReaderPropsLength: 9,
//     v2: true,

//     SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
//     INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
//     // contract requires that execution fee be strictly greater than instead of gte
//     DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
//   },

//   [ARBITRUM]: {
//     nativeTokenSymbol: "ETH",
//     wrappedTokenSymbol: "WETH",
//     defaultCollateralSymbol: "USDC.e",
//     defaultFlagOrdersEnabled: false,
//     positionReaderPropsLength: 9,
//     v2: true,

//     SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
//     INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
//     // contract requires that execution fee be strictly greater than instead of gte
//     DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
//   },

//   [AVALANCHE]: {
//     nativeTokenSymbol: "AVAX",
//     wrappedTokenSymbol: "WAVAX",
//     defaultCollateralSymbol: "USDC",
//     defaultFlagOrdersEnabled: true,
//     positionReaderPropsLength: 9,
//     v2: true,

//     SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
//     INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
//     // contract requires that execution fee be strictly greater than instead of gte
//     DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
//   },

//   [AVALANCHE_FUJI]: {
//     nativeTokenSymbol: "AVAX",
//     wrappedTokenSymbol: "WAVAX",
//     defaultCollateralSymbol: "USDC",
//     defaultFlagOrdersEnabled: true,
//     positionReaderPropsLength: 9,
//     v2: true,

//     SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
//     INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
//     // contract requires that execution fee be strictly greater than instead of gte
//     DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
//   },
// };

// const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const RPC_PROVIDERS = {
  [ETH_MAINNET]: ["https://rpc.ankr.com/eth"],
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
  [BCS_TESTNET]: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  // [ARBITRUM]: ["wss://arbitrum-one.publicnode.com"],
  [ARBITRUM]: ["https://arb1.arbitrum.io/rpc"],
  [ARBITRUM_GOERLI]: [
    // "wss://arbitrum-goerli.publicnode.com",
    "https://goerli-rollup.arbitrum.io/rpc"
    // "https://goerli-rollup.arbitrum.io/rpc",
    // "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    // "https://arbitrum-goerli.public.blastapi.io"
  ],
  [AVALANCHE]: ["https://api.avax.network/ext/bc/C/rpc"],
  [AVALANCHE_FUJI]: [
    "https://avalanche-fuji-c-chain.publicnode.com",
    "https://api.avax-test.network/ext/bc/C/rpc",
    // "https://ava-testnet.public.blastapi.io/v1/avax/fuji/public",
    // "https://rpc.ankr.com/avalanche_fuji",
  ],
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getExplorerUrl(chainId: number) {
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  } else if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  } else if (chainId === BCS_MAINNET) {
    return "https://bscscan.com/";
  } else if (chainId === BCS_TESTNET) {
    return "https://testnet.bscscan.com/";
  } else if (chainId === ARBITRUM_GOERLI) {
    return "https://goerli.arbiscan.io/";
  } else if (chainId === ARBITRUM) {
    return "https://arbiscan.io/";
  } else if (chainId === AVALANCHE) {
    return "https://snowtrace.io/";
  } else if (chainId === AVALANCHE_FUJI) {
    return "https://testnet.snowtrace.io/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId: number) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}