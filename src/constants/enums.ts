export enum HercleusActionType {
    // data types
    Stake,
    Unstake,
    GetTotalAssetsMD,
    ClaimReward,
    SwapRemote
}

export enum TheseusActionType {
    // Action types
    Stake,
    Unstake,
    SwapTokens,
    ClaimRewards,
    CancelAction
}

export enum OrderType {
    // @dev MarketSwap: swap token A to token B at the current market price
    // the order will be cancelled if the minOutputAmount cannot be fulfilled
    MarketSwap,
    // @dev LimitSwap: swap token A to token B if the minOutputAmount can be fulfilled
    LimitSwap,
    // @dev MarketIncrease: increase position at the current market price
    // the order will be cancelled if the position cannot be increased at the acceptablePrice
    MarketIncrease,
    // @dev LimitIncrease: increase position if the triggerPrice is reached and the acceptablePrice can be fulfilled
    LimitIncrease,
    // @dev MarketDecrease: decrease position at the current market price
    // the order will be cancelled if the position cannot be decreased at the acceptablePrice
    MarketDecrease,
    // @dev LimitDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
    LimitDecrease,
    // @dev StopLossDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
    StopLossDecrease,
    // @dev Liquidation: allows liquidation of positions if the criteria for liquidation are met
    Liquidation
}

export const DecreasePositionSwapType = {
    NoSwap: 0,
    SwapPnlTokenToCollateralToken: 1,
    SwapCollateralTokenToPnlToken: 2,
  };