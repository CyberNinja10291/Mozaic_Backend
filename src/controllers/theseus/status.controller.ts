import { Request, Response } from "express";
import { getTheseusContractInstance } from "../../configs/contracts.config";

const getCurrentLpRate = async (req: Request, res: Response) => {
    try {
        const vaultContract = getTheseusContractInstance().vault();
        let lprate = Number(await vaultContract.getCurrentLiquidityProviderRate());
        lprate = lprate / 1e18;
        return res.status(200).json({ 
            status: "success",
            data: {
                lprate,
            }
        });
    } catch (error) {
        console.error('Error in getCurrentLpRate:', error);
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message,
            }
        });
    }
}

const getTvl = async (req: Request, res: Response) => {
    try {
        const vaultContract = getTheseusContractInstance().vault();
        let tvl: number = Number(await vaultContract.totalAssetInUsd());
        tvl = tvl / 1e36;

        return res.status(200).json({ 
            status: "success",
            data: {
                tvl,
            }
        });
    } catch (error) {
        console.error('Error in getTvl:', error);
        return res.status(500).json({ 
            status: "failure",
            error: {
                message: error.message, 
            }
        });
    }
}

const getPosition = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { address } = req.query;
        
        if (!address) {
            return res.status(400).json({
                status: "failure",
                error: {
                    message: 'Missing required parameters: address'
                } 
            });
        }

        const vaultContract = getTheseusContractInstance().vault();
        let position = await vaultContract.balanceOf(address);
        position = position / 1e6;

        return res.status(200).json({ 
            status: "success",
            data: {
                position: position,
            }
        });
    } catch (error) {
        console.error('Error in getPosition:', error);
        return res.status(500).json({
            status: "failure",
            error: {
                message: error.message
            } 
        });
    }
};

export default { getCurrentLpRate, getTvl, getPosition };