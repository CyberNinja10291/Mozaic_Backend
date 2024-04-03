export type PoolValue = {
    poolId: number,
    poolValue: number,
}

export type MarketInfo = {
    pluginId: number,
    poolId: number,
    marketToken: string,
    indexToken: string,
    longToken: string,
    shortToken: string
}

export type PriceProps = {
    min: number,
    max: number,
}

export type MarketProps = {
    marketToken: string,
    indexToken: string,
    longToken: string,
    shortToken: string
}

export type GasLimits = {
    depositSingleToken: number,
    depositMultiToken: number,
    withdrawalMultiToken: number,
    singleSwap: number,
    swapOrder: number,
    increaseOrder: number,
    decreaseOrder: number,
    estimatedFeeBaseGasLimit: number,
    estimatedFeeMultiplierFactor: number
}

export type WithdrawalAmounts = {
    marketTokenAmount: number;
    marketTokenUsd: number;
    longTokenAmount: number;
    shortTokenAmount: number;
    longTokenUsd: number;
    shortTokenUsd: number;
    swapFeeUsd: number;
    uiFeeUsd: number;
    swapPriceImpactDeltaUsd: number;
  };

  export type GMXPoolInfo = {
    pluginId: number, 
    poolId: number,
    poolName: string,
    marketToken: string,
    indexToken: string,
    longToken: string,
    shortToken: string,
    apr: GMXApy,
    gmTokenPrice: number,
    gmTokenAmount: number,
    assetInUsd: number,
}

export type GMXApy =  {
    base: number,
    bonus: number,
    total: number
}