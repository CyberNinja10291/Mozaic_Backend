import { Response, Request } from "express";
import axios from "axios";
import { ApyInfo } from "../../types/hercleus";
import { hercleusSupportTokens } from "../../constants/contract";
import { HERCLEUS_IRONHAND } from "../../configs/url.config";
import hercleusVaultService from "../../services/hercleus/vault.service";


const selectDepositToken = async (req: Request, res: Response) => {
    try {
        
        const { chainId } = req.query;

        const chainIdNumber = Number(chainId);

        const url = HERCLEUS_IRONHAND + "/api/apy/recent";

        axios.get(url)
            .then((response: any) => {
                if(response.data.status == 200) {
                    const arr: ApyInfo[] = response.data.recentApy;
                    const apyInfoByChainId: ApyInfo[] = arr.filter((res: ApyInfo) => res.chainId == chainIdNumber);
                    if(apyInfoByChainId.length == 0) {
                        return res.status(400).json({
                            status: "failure",
                            error: {
                                message: "No supported chainId.",
                            },
                        });
                    }
                    apyInfoByChainId.sort((a: ApyInfo, b: ApyInfo) => b.apy - a.apy);
                    return res.status(200).json({ 
                        status: "success",
                        data: {
                            tokenAddress: apyInfoByChainId[0].tokenAddress,
                        }
                    });
                } else {
                    return res.status(400).json({ 
                        status: "failure",
                        error: {
                            message: "Can't select the deposit token.",
                        }
                    });
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    status: "failure",
                    error: {
                        message: error.message, 
                    }
                });
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

const selectWithdrawToken = async (req: Request, res: Response) => {
    try {
        const { chainId } = req.query;

        const chainIdNumber = Number(chainId);

        let array = [];
        for(const tokenAddress of Object.values(hercleusSupportTokens[chainIdNumber])) {
            const value = await hercleusVaultService.getTokenBalanceByChainId(chainIdNumber, tokenAddress);
            array.push([tokenAddress, value]);
        }
        array.sort((a: any, b: any) => b[1] - a[1]);
        return res.status(200).json({ 
            status: "success",
            data: {
                tokenAddress: array[0][0],
            }
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

export default { selectDepositToken, selectWithdrawToken };