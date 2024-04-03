export type PoolInfo =  {
    chainId: number,
    chainName: string,
    pluginId: number, 
    tokenName: string,
    tokenAddress: string,
    apy: number,
}

export type ApyInfo = {
    chainId: number,   
    chainName: string, 
    pluginId: number,      
    tokenName: string,
    tokenAddress: string,
    apy: number,
    stakedAmount: number,
    holdAmount: number,
}

export type RewardInfo = {
    rewardTokenAddress: string,
    rewardBalance: number,
    rewardDecimals: number
}