import { getTokens } from "../configs/gmx.config.ts/tokens";
import { getContract } from "./ethers.utils";
import { tokenABI } from "../configs/abis.config";
export const getTokenInfo = (chainId: number, tokenAddress: string): any => {
    const tokens = getTokens(chainId);
    const tokenInfo = tokens.find((token: any) => token.address == tokenAddress);
    return tokenInfo;
}

export const getTokenBalance = async (chainId: number, tokenAddress: string, address: string) => {
    const tokenContract = getContract(chainId, tokenABI, tokenAddress);
    const balance = await tokenContract.balanceOf(address);

    return balance;
};