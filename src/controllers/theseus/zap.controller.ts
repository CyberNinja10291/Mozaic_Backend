import { Request, Response } from "express";
import { USDC } from "../../constants/tokens";
import { PoolValue } from "../../types/theseus";
import { getTheseusContractInstance } from "../../configs/contracts.config";
import { getTokenInfo } from "../../utils/tokenInfo";
import { status } from "../../utils/estimate";
import estimateService from "../../services/theseus/estimate.service";
import { DEFAULT_CHAIN_ID } from "../../constants/chains";

const selectDepositToken = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ 
            status: "success",
            data: {
                tokenAddress: USDC,
            }
        });
    } catch (error) {
        console.error('Error in selectDepositToken:', error);
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message
            } 
        });
    }
}

const selectWithdrawalPluginAndPool = async (req: Request, res: Response) => {
    try {
        const gmxPluginContract = getTheseusContractInstance().plugin();
        const vaultContract = getTheseusContractInstance().vault();

        const poolValues: PoolValue[] = await gmxPluginContract.getPoolValues();

        const maxPool: PoolValue = poolValues.reduce((max: PoolValue, current: PoolValue) => (Number(current.poolValue) > Number(max.poolValue) ? current : max), poolValues[0]);
        
        const tokenList: string[] = await vaultContract.getTokensByPluginAndPoolId(1, maxPool.poolId);

        const tokenInfos = tokenList.map((token: string) => {
            const info = getTokenInfo(DEFAULT_CHAIN_ID, token);
            return {
                address: token,
                symbol: info.symbol,
                decimals: info.decimals,
            }
        });

        return res.status(200).json({
            status: "success",
            data: {
                pluginId: 1,
                poolId: maxPool.poolId,
                tokenList: tokenInfos,
            }
        });
    } catch (error) {
        console.error('Error in selectWithdrawalPluginAndPool:', error);
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message, 
            }
        });
    }
}

const estimateTokenAmout = async (req: Request, res: Response) => {
    try {
        const { pluginId, poolId, lpAmount } = req.query;

        if(status == false) {
            return res.status(400).json({
                status: "failure",
                error: {
                    message: 'not initialized yet'
                }
            });
        }
        
        if (!pluginId || !poolId || !lpAmount) {
            return res.status(400).json({ 
                status: "failure",
                error: {
                    message: 'Missing required parameters'
                }
            });
        }

        const vaultContract = getTheseusContractInstance().vault();

        const usdcAmount = await vaultContract.convertLPToAsset(lpAmount);
        const poolTokenPrice = await vaultContract.getPoolTokenPrice(pluginId, poolId);
        const poolTokenAmount = usdcAmount * 1e12 / poolTokenPrice;
        
        const result = await estimateService.getWithdrawalAmounts(DEFAULT_CHAIN_ID, Number(pluginId), Number(poolId), Number(poolTokenAmount));

        return res.status(200).json({
            status: "success",
            data: {
                ...result,
            }
        });
    } catch (error) {
        console.error('Error in estimateTokenAmout:', error);
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message,
            }
        });
    }
}

export default { selectDepositToken, selectWithdrawalPluginAndPool, estimateTokenAmout };