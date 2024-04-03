import { Request, Response } from "express";
import { getHercleusContractInstance } from "../../configs/contracts.config";
import { SUPPORT_CHAINS } from "../../constants/chains";
import { hercleusSupportTokens, hercleusTokenData } from "../../constants/contract";

const getCurrentLpRate = async (req: Request, res: Response) => {
    try {
        const hercleusController = getHercleusContractInstance().controller();
        const totalAsset = Number(await hercleusController.totalCoinMD());
        const totalSupply = Number(await hercleusController.totalMLP());
        let lprate: number = 1;
        if(totalSupply != 0) lprate = totalAsset / totalSupply;
        return res.status(200).json({
            status: "success",
            data: {
                lprate
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            error: {
                message: error.message
            }
        });
    }
}

const getMozLPBalance = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { chainId, address } = req.query;

        const mozLP = getHercleusContractInstance().mozlp(Number(chainId));      
        const balance = Number(await mozLP.balanceOf(address)) / 1e6;

        return res.status(200).json({ 
            status: "success", 
            data: {
                lp_balance: balance
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            error: {
                message: error.message, 
            } 
        });
    }
}

const getPosition = async (req: Request, res: Response) => {
    try {
        const { address } = req.query;
        let totalPosition: number = 0;
        for(let chainId of SUPPORT_CHAINS) {
            const mozLP = getHercleusContractInstance().mozlp(Number(chainId));
            const balance = Number(await mozLP.balanceOf(address)) / 1e6;
            totalPosition  += balance;
        }
        return res.status(200).json({
            status: "success",
            data: {
                position: totalPosition 
            }
        })
    } catch (error) {
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message
            } 
        });
    }
}

const getTvl = async (req: Request, res: Response) => {
    try {
        let totalBalance = 0;
        for (let chainId of SUPPORT_CHAINS) {

            const vault = getHercleusContractInstance().vault(chainId);
            
            for (let [tokenName, tokenAddress] of Object.entries(hercleusSupportTokens[chainId])) {
                const info = await vault.getAvailbleAmountPerToken(tokenAddress);
                const balance = Number(info[0]);
                if(balance != 0) {
                    const decimals = hercleusTokenData[chainId][tokenName].decimals;
                    const balanceMD = balance / Math.pow(10, decimals - 6);
                    totalBalance += balanceMD;
                }
            }
        }
        const tvl = totalBalance / 1e6;

        return res.status(200).json({
            status: "success",
            data: {
                tvl
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message, 
            }
        });
    }
}

export default {
    getCurrentLpRate,
    getMozLPBalance,
    getPosition,
    getTvl,
}