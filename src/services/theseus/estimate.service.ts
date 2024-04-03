import { expandDecimals } from "../../utils/numbers";
import { MarketInfo, WithdrawalAmounts } from "../../types/theseus";
import { MARKET_INFOS, MARKET_TOKEN_SUPPLYS, POOL_AMOUNTS, POOL_VALUES, PRICES, SWAP_FEE_FACTOR_FOR_NEGATIVE_IMPACT, UI_FEE_FACTOR, getExecutionFee } from "../../utils/estimate";
import { applyFactor, convertToTokenAmount, convertToUsd } from "../../utils/convert";
import { getTokenInfo } from "../../utils/tokenInfo";

const getWithdrawalAmounts = async (chainId: number, pluginId: number, poolId: number, marketTokenAmount: number) => {
    const marketInfo: MarketInfo | undefined = MARKET_INFOS.find((info: MarketInfo) => info.pluginId == pluginId && info.poolId == poolId);
    const longPoolAmount = POOL_AMOUNTS[marketInfo.marketToken][marketInfo.longToken];
    const shortPoolAmount = POOL_AMOUNTS[marketInfo.marketToken][marketInfo.shortToken];

    const longTokenInfo = getTokenInfo(chainId, marketInfo.longToken);
    const shortTokenInfo = getTokenInfo(chainId, marketInfo.shortToken);


    const longPoolUsd = convertToUsd(longPoolAmount, PRICES[marketInfo.longToken]["max"]);
    const shortPoolUsd = convertToUsd(shortPoolAmount, PRICES[marketInfo.shortToken]["max"]);

    const totalPoolUsd = longPoolUsd + shortPoolUsd;

    const values: WithdrawalAmounts = {
        marketTokenAmount: 0,
        marketTokenUsd: 0,
        longTokenAmount: 0,
        longTokenUsd: 0,
        shortTokenAmount: 0,
        shortTokenUsd: 0,
        swapFeeUsd: 0,
        uiFeeUsd: 0,
        swapPriceImpactDeltaUsd: 0,
    };

    values.marketTokenAmount = marketTokenAmount;   

    const poolValue = POOL_VALUES[marketInfo.marketToken];

    const marketTokenTotalSupply = MARKET_TOKEN_SUPPLYS[marketInfo.marketToken];
    const marketTokenDecimals = 18;

    const price = marketTokenTotalSupply == 0 ? Number(expandDecimals(1, 30)) : poolValue / marketTokenTotalSupply;

    values.marketTokenUsd = convertToUsd(marketTokenAmount, price);
    values.longTokenUsd = values.marketTokenUsd * longPoolUsd / totalPoolUsd;
    values.shortTokenUsd = values.marketTokenUsd * shortPoolUsd / totalPoolUsd;

    const uiFeeFactor: number = UI_FEE_FACTOR;
    const swapFeeFactorForNegativeImpact: number = SWAP_FEE_FACTOR_FOR_NEGATIVE_IMPACT[marketInfo.marketToken];
    const longSwapFeeUsd = applyFactor(values.longTokenUsd, swapFeeFactorForNegativeImpact);
    const shortSwapFeeUsd = applyFactor(values.shortTokenUsd, swapFeeFactorForNegativeImpact);
    const longUiFeeUsd = applyFactor(values.marketTokenUsd, uiFeeFactor);
    const shortUiFeeUsd = applyFactor(values.shortTokenUsd, uiFeeFactor);

    values.uiFeeUsd = applyFactor(values.marketTokenUsd, uiFeeFactor);
    values.swapFeeUsd = longSwapFeeUsd + shortSwapFeeUsd;

    values.longTokenUsd = values.longTokenUsd - longSwapFeeUsd - longUiFeeUsd;
    values.shortTokenUsd = values.shortTokenUsd - shortSwapFeeUsd - shortUiFeeUsd;

    values.longTokenAmount = convertToTokenAmount(values.longTokenUsd, PRICES[marketInfo.longToken]["max"]);
    values.shortTokenAmount = convertToTokenAmount(
      values.shortTokenUsd,
      PRICES[marketInfo.shortToken]["max"]
    );

    const swapFee = -values.swapFeeUsd;
    const swapPriceImpact = values.swapPriceImpactDeltaUsd;
    const uiFee = -values.uiFeeUsd;

    const totalFees = swapFee + swapPriceImpact + uiFee;
    const executionFee = await getExecutionFee(chainId);
    const totalFeesUsd = totalFees - executionFee.feeUsd;
    console.log("totalFeesUsd", totalFees, executionFee, totalFeesUsd);
    const longTokenData = {
        symbol: longTokenInfo.symbol,
        address: marketInfo.longToken,
        decimals: longTokenInfo.decimals,
        amount: values.longTokenAmount / Math.pow(10, longTokenInfo.decimals),
        amountInUsd: values.longTokenUsd / 1e30,
    }
    const shortTokenData = {
        symbol: shortTokenInfo.symbol,
        address: marketInfo.shortToken,
        decimals: shortTokenInfo.decimals,
        amount: values.shortTokenAmount / Math.pow(10, shortTokenInfo.decimals),
        amountInUsd: values.shortTokenUsd / 1e30,
    }
    return {
        tokens: {
            longTokenData,
            shortTokenData,
        },
        totalFeesUsd: totalFeesUsd / 1e30
    };
}

export default {getWithdrawalAmounts}