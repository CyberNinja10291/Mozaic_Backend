import { ethers } from "ethers";
import axios from "axios";
import { hashData } from "../utils/hash";
import { GasLimits, MarketInfo, MarketProps, PriceProps } from "../types/theseus";
import { getGMXContractInstance, getTheseusContractInstance, getTokenContractInstance } from "../configs/contracts.config";
import { gmxAddresses } from "../constants/contract";
import { ESTIMATED_GAS_FEE_BASE_AMOUNT, ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR, MAX_PNL_FACTOR_FOR_DEPOSITS_KEY, POOL_AMOUNT_KEY, decreaseOrderGasLimitKey, depositGasLimitKey, increaseOrderGasLimitKey, singleSwapGasLimitKey, swapFeeFactorKey, swapOrderGasLimitKey, uiFeeFactorKey, withdrawalGasLimitKey } from "../configs/gmx.config.ts/dataStore";
import { getProvider } from "./ethers.utils";
import { EXECUTION_FEE_CONFIG_V2, getChainName, getHighExecutionFee } from "../configs/gmx.config.ts/chains";
import { BASIS_POINTS_DIVISOR } from "../configs/gmx.config.ts/factors";
import { applyFactor, convertToUsd } from "./convert";
import { expandDecimals } from "./numbers";
import { UI_FEE_RECEIVER_ACCOUNT } from "../configs/gmx.config.ts/ui";
import { PRICE_TICKER } from "../configs/url.config";
import { ARBITRUM } from "../constants/chains";

export let MARKET_INFOS: MarketInfo[] = [];

export let POOL_AMOUNTS: { [key: string]: { [key: string]: number } } = {};

export let PRICES: { [key: string]: {max?: number, min?: number} } = {};

export let POOL_VALUES: { [key: string]: number } = {};

export let MARKET_TOKEN_SUPPLYS: { [key: string]: number } = {};

export let SWAP_FEE_FACTOR_FOR_NEGATIVE_IMPACT: { [key: string]: number} = {}; 

export let UI_FEE_FACTOR: number = 0;

export let GAS_LIMITS: GasLimits = {
    depositSingleToken: 0,
    depositMultiToken: 0,
    withdrawalMultiToken: 0,
    singleSwap: 0,
    swapOrder: 0,
    increaseOrder: 0,
    decreaseOrder: 0,
    estimatedFeeBaseGasLimit: 0,
    estimatedFeeMultiplierFactor: 0
};

export let status = false;
export const init = async (chainId: number = ARBITRUM) => {
    await getMarketsInfo(chainId);
    await getPrices();
    await getPoolAmounts(chainId);
    await getPoolValues(chainId);
    await getMarketTokenSupply(chainId);
    await useSwapFeeFactorForNegativeImpact(chainId);
    await useUiFeeFactor(chainId);
    await useGasLimits(chainId);
    status = true;
    console.log("initialized");
}

export const update = async (chainId: number = ARBITRUM) => {
    await getPrices();
    await getPoolAmounts(chainId);
    await getPoolValues(chainId);
    await getMarketTokenSupply(chainId);
    await useSwapFeeFactorForNegativeImpact(chainId);
    await useUiFeeFactor(chainId);
    await useGasLimits(chainId);
    console.log("updated");
}

const getMarketsInfo = async(chainId: number): Promise<MarketInfo[]> => {
    const gmxPluginContract = getTheseusContractInstance().plugin();
    const pools = await gmxPluginContract.getPools();
    const marketInfo: MarketInfo[] = pools.map((pool: MarketInfo) => ({
        pluginId: 1,
        ...pool
    }));
    MARKET_INFOS = marketInfo;
    return marketInfo;
}

export const getPoolValues = async (chainId: number) => {
    const ReaderContract = getGMXContractInstance().reader();
    for(const marketInfo of MARKET_INFOS) {
        const market: MarketProps = {
            marketToken: marketInfo.marketToken,
            indexToken: marketInfo.indexToken,
            longToken: marketInfo.longToken,
            shortToken: marketInfo.shortToken
        };
    
        const indexTokenPrice: PriceProps = {
            min: PRICES[marketInfo.indexToken]["min"],
            max: PRICES[marketInfo.indexToken]["max"],
        };
    
        const longTokenPrice: PriceProps = {
            min: PRICES[marketInfo.longToken]["min"],
            max: PRICES[marketInfo.longToken]["max"],
        };
        
        const shortTokenPrice: PriceProps = {
            min: PRICES[marketInfo.shortToken]["min"],
            max: PRICES[marketInfo.shortToken]["max"],
        };
        let marketTokenPriceMax = await ReaderContract.getMarketTokenPrice(gmxAddresses.DataStore, market, indexTokenPrice, longTokenPrice, shortTokenPrice, MAX_PNL_FACTOR_FOR_DEPOSITS_KEY, true);
        const [_priceMax, poolValueInfoMax] = marketTokenPriceMax;
        POOL_VALUES[marketInfo.marketToken] = poolValueInfoMax.poolValue;
    };
}

export const getMarketTokenSupply = async (chainId: number) => {
    for(const marketInfo of MARKET_INFOS) {
        const MarketTokenContract = getTokenContractInstance(chainId, marketInfo.marketToken);
        const totalSupply = await MarketTokenContract.totalSupply();
        MARKET_TOKEN_SUPPLYS[marketInfo.marketToken] = Number(totalSupply);
    }
}

export const getPrices = async () => {
    const result = await axios.get(PRICE_TICKER);

    result.data.forEach((res: any) => {
        if(!PRICES[res.tokenAddress]) {
            PRICES[res.tokenAddress] = {};
        } 
        PRICES[res.tokenAddress]["max"] = res.maxPrice;
        PRICES[res.tokenAddress]["min"] = res.minPrice;
    });
}

export const getPoolAmounts = async (chainId: number) => {
    const DataStoreContract = getGMXContractInstance().dataStore();
    for(const marketInfo of MARKET_INFOS) {
        if(!POOL_AMOUNTS[marketInfo.marketToken]) {
            POOL_AMOUNTS[marketInfo.marketToken] = {};
        }
        POOL_AMOUNTS[marketInfo.marketToken][marketInfo.longToken] = await DataStoreContract.getUint(poolAmountKey(marketInfo.marketToken, marketInfo.longToken));
        POOL_AMOUNTS[marketInfo.marketToken][marketInfo.shortToken] = await DataStoreContract.getUint(poolAmountKey(marketInfo.marketToken, marketInfo.shortToken));
    };
}

export function poolAmountKey(market: string, token: string) {
    return hashData(["bytes32", "address", "address"], [POOL_AMOUNT_KEY, market, token]);
}

export const useSwapFeeFactorForNegativeImpact = async (chainId: number) => {
    const DataStoreContract = getGMXContractInstance().dataStore();
    for(const marketInfo of MARKET_INFOS) { 
        SWAP_FEE_FACTOR_FOR_NEGATIVE_IMPACT[marketInfo.marketToken] = Number(await DataStoreContract.getUint(swapFeeFactorKey(marketInfo.marketToken, false)));
    }
}
// UI_FEE_RECEIVER_ACCOUNT
export async function useUiFeeFactor(chainId: number, account = UI_FEE_RECEIVER_ACCOUNT) {
    const DataStoreContract = getGMXContractInstance().dataStore();
    UI_FEE_FACTOR = Number(await DataStoreContract.getUint(uiFeeFactorKey(account)));
}

export const MARKET_TOKEN_TO_POOL_NAME: {[key: string]: string} = {
    "0x47c031236e19d024b42f8AE6780E44A573170703": "BTC/USD[BTC-USDC]",
    "0x70d95587d40A2caf56bd97485aB3Eec10Bee6336": "ETH/USD[WETH-USDC]",
    "0x6853EA96FF216fAb11D2d930CE3C508556A4bdc4": "DOGE/USD[WETH-USDC]",
    "0x09400D9DB990D5ed3f35D7be61DfAEB900Af03C9": "SOL/USD[SOL-USDC]",
    "0xD9535bB5f58A1a75032416F2dFe7880C30575a41": "LTC/USD[WETH-USDC]",
    "0xc7Abb2C5f3BF3CEB389dF0Eecd6120D451170B50": "UNI/USD[UNI-USDC]",
    "0x7f1fa204bb700853D36994DA19F830b6Ad18455C": "LINK/USD[LINK-USDC]",
    "0xC25cEf6061Cf5dE5eb761b50E4743c1F5D7E5407": "ARB/USD[ARB-USDC]",
    "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c": "XRP/USD[WETH-USDC]",
    "0x2d340912Aa47e33c90Efb078e69E70EFe2B34b9B": "BNB/USD[BNB-USDC]",
}

export const useGasLimits = async (chainId: number) => {
    const DataStoreContract = getGMXContractInstance().dataStore();

    const depositSingleToken = await DataStoreContract.getUint(depositGasLimitKey(true));
    const depositMultiToken = await DataStoreContract.getUint(depositGasLimitKey(false));
    const withdrawalMultiToken = await DataStoreContract.getUint(withdrawalGasLimitKey());
    const singleSwap = await DataStoreContract.getUint(singleSwapGasLimitKey());
    const swapOrder = await DataStoreContract.getUint(swapOrderGasLimitKey());
    const increaseOrder = await DataStoreContract.getUint(increaseOrderGasLimitKey());
    const decreaseOrder = await DataStoreContract.getUint(decreaseOrderGasLimitKey());
    const estimatedFeeBaseGasLimit = await DataStoreContract.getUint(ESTIMATED_GAS_FEE_BASE_AMOUNT);
    const estimatedFeeMultiplierFactor = await DataStoreContract.getUint(ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR);

    GAS_LIMITS = {
        depositSingleToken: depositSingleToken,
        depositMultiToken: depositMultiToken,
        withdrawalMultiToken: withdrawalMultiToken,
        singleSwap: singleSwap,
        swapOrder: swapOrder,
        increaseOrder: increaseOrder,
        decreaseOrder,
        estimatedFeeBaseGasLimit,
        estimatedFeeMultiplierFactor
    };
    return GAS_LIMITS;
}

export const useGasPrice = async (chainId: number) => {
    const provider = getProvider(chainId);
    const gasPrice = Number(await provider.getGasPrice());
    const buffer =  gasPrice * EXECUTION_FEE_CONFIG_V2[chainId].defaultBufferBps / BASIS_POINTS_DIVISOR;
    return gasPrice + buffer;
}

export const getExecutionFee = async (chainId: number) => {
    const gasPrice = await useGasPrice(chainId);

    const callbackGasLimit = 2000000;
    const estimatedGasLimit = Number(GAS_LIMITS.withdrawalMultiToken) + callbackGasLimit;
    const baseGasLimit = GAS_LIMITS.estimatedFeeBaseGasLimit;
    const multiplierFactor = GAS_LIMITS.estimatedFeeMultiplierFactor;
    const adjustedGasLimit = Number(baseGasLimit) + applyFactor(estimatedGasLimit, multiplierFactor);
    const feeTokenAmount = adjustedGasLimit * gasPrice;
    const tokenPrice = PRICES["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"].max;

    const feeUsd = convertToUsd(feeTokenAmount, tokenPrice);
    const isFeeHigh = feeUsd > Number(expandDecimals(getHighExecutionFee(chainId), 30));

    const warning = isFeeHigh
    ? `The network Fees are very high currently, which may be due to a temporary increase in transactions on the ${getChainName(
        chainId
      )} network.`
    : undefined;
    return {
        feeUsd,
        feeTokenAmount, 
        feeToken: ethers.constants.AddressZero,
        warning
    }
}