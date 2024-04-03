import { ethers } from "ethers";
import { ARBITRUM } from "../../constants/chains";
import { GMXPoolInfo } from "../../types/theseus";
import { theseusAddresses } from "../../constants/contract";
import { TheseusActionType } from "../../constants/enums";
import { getTheseusContractInstance, getTokenContractInstance } from "../../configs/contracts.config";
import { getTokenContract, getTurnkeySigner } from "../../utils/ethers.utils";
import lifiService from "../lifiswap.service";
import vaultService from "./vault.service";
import ironhandService from "../ironhand.service";

// export const rebalance = async (chainId: number) => {
//     const vaultContract = getTheseusContractInstance().vault();

//     const acceptedTokenlist: string[] = await vaultContract.getAcceptedTokens();
//     const pools : GMXPoolInfo[] = await ironhandService.getRecentApys("theseus");
//     let _payload: string, payload: string;
//     for(let i = 0; i < acceptedTokenlist.length; i++) {
//         const tokenContract = getTokenContract(chainId, acceptedTokenlist[i]);
//         const balance = await tokenContract.balanceOf(theseusAddresses[chainId].VAULT);
//         if(Number(balance) == 0) continue;
//         const supportedPools: GMXPoolInfo[] = pools.filter((pool: GMXPoolInfo) => pool.longToken == acceptedTokenlist[i] || pool.shortToken == acceptedTokenlist[i]);
//         supportedPools.sort((a: GMXPoolInfo, b: GMXPoolInfo) => b.apr.total - a.apr.total);
//         const selectedPool: GMXPoolInfo = supportedPools[0];
//         const poolId = selectedPool.poolId;
//         _payload = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);
//         payload = ethers.utils.defaultAbiCoder.encode(['uint8', 'address[]', 'uint256[]', 'bytes'], [poolId, [acceptedTokenlist[i]], [balance], _payload]);
//         const signer = getTurnkeySigner(chainId);
//         await vaultContract.connect(signer).execute(1, TheseusActionType.Stake, payload);
//     }
// }

export const stakeToPool  = async(pluginId: number, poolId: number) => {
    const vaultContract = getTheseusContractInstance().vault();
    
    const allowedTokens = await vaultContract.getTokensByPluginAndPoolId(pluginId, poolId);
    let allowedTokenBalances: number[] = [];
    for(let i = 0; i < allowedTokens.length; i++) {
        const tokenContract = getTokenContract(ARBITRUM, allowedTokens[i]);
        allowedTokenBalances[i] = await tokenContract.balanceOf(theseusAddresses[ARBITRUM].VAULT);
    }
    const _payload = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);
    const payload = ethers.utils.defaultAbiCoder.encode(['uint8', 'address[]', 'uint256[]', 'bytes'], [poolId, allowedTokens, allowedTokenBalances, _payload]);
    const signer = getTurnkeySigner();
    console.log("signer", await signer.getAddress());
    await vaultContract.connect(signer).execute(1, TheseusActionType.Stake, payload);
}

export const stakeToken = async(pluginId: number, poolId: number, token: string, amount: bigint) => {
    try {
        const vaultContract = getTheseusContractInstance().vault();
        const allowedTokens = await vaultContract.getTokensByPluginAndPoolId(pluginId, poolId);
        const amounts: bigint[] = [BigInt(0), BigInt(0)];
        let isSupport = false;
        for(let i = 0; i < allowedTokens.length; i++) {
            if(allowedTokens[i] == token) {
                amounts[i] = amount;
                isSupport = true;
                break;
            }
        }
        if(isSupport == false) {
            console.log("unsupport token");
            return;
        }
        let allowedTokenBalances: number[] = [];
        for(let i = 0; i < allowedTokens.length; i++) {
            const tokenContract = getTokenContract(ARBITRUM, allowedTokens[i]);
            allowedTokenBalances[i] = Number(await tokenContract.balanceOf(theseusAddresses[ARBITRUM].VAULT));
        }
        for(let i = 0; i < allowedTokenBalances.length; i++) {
            if(amounts[i] > allowedTokenBalances[i]){
                console.log("invalid stake amount");
                return;
            }
        }
        await vaultService.stakeAsset(pluginId, poolId, allowedTokens, amounts);
    } catch(error) {
        console.log(error.message);
    }
}

const stakeTokens = async(pluginId: number, poolId: number, tokens: string[], amounts: bigint[]) => {
    try {
        const vaultContract = getTheseusContractInstance().vault();
        const allowedTokens = await vaultContract.getTokensByPluginAndPoolId(pluginId, poolId);
        let isSupport = true;
        for(let i = 0; i < allowedTokens.length; i++) {
            if(allowedTokens[i] != tokens[i]) {
                isSupport = false;
                break;
            }
        }
        if(isSupport == false) {
            console.log("unsupport token");
            return;
        }
        let allowedTokenBalances: number[] = [];
        for(let i = 0; i < allowedTokens.length; i++) {
            const tokenContract = getTokenContract(ARBITRUM, allowedTokens[i]);
            allowedTokenBalances[i] = Number(await tokenContract.balanceOf(theseusAddresses[ARBITRUM].VAULT));
        }
        for(let i = 0; i < allowedTokenBalances.length; i++) {
            if(amounts[i] > allowedTokenBalances[i]){
                console.log("invalid stake amount");
                return;
            }
        }
        await vaultService.stakeAsset(pluginId, poolId, allowedTokens, amounts);
    } catch(error) {
        console.log(error.message);
    }
}


export const unstakeTokens = async (pluginId: number, poolId: number, marketAmount: bigint) => {
    try {
        if(Number(marketAmount) == 0) return;
        if(pluginId != 1) {
            console.log("Invalid pluginId");
            return;
        }
        await vaultService.unstakeAsset(pluginId, poolId, marketAmount);
    } catch(error) {
        console.log(error.message);
    }
}

const getTheseusPoolIdByLongToken = async (token: string): Promise<number> => {
    const gmxPluginContract = getTheseusContractInstance().plugin();
    const pools = await gmxPluginContract.getPools();
    for(const pool of pools) {
        if(pool.longToken == token) return pool.poolId;
    }
    return -1;
}

export const theseusRewardSwap = async (fromToken: string, toToken: string) => {
    const tokenContract = getTokenContractInstance(ARBITRUM, fromToken);
    const balance = await tokenContract.balanceOf(theseusAddresses[ARBITRUM].VAULT);
    console.log("balance", balance);

    await lifiService.theseusLifiSwap(fromToken, toToken, balance);    
}

export default {
    stakeToPool,
    stakeToken,
    stakeTokens,
    unstakeTokens,
    getTheseusPoolIdByLongToken,
    theseusRewardSwap
}