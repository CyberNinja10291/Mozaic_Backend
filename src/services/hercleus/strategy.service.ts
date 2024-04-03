import { getHercleusContractInstance } from "../../configs/contracts.config";
import { SUPPORT_CHAINS } from "../../constants/chains";
import { hercleusAddresses, hercleusSupportTokens } from "../../constants/contract";
import { PoolInfo} from "../../types/hercleus";
import { getTokenContract } from "../../utils/ethers.utils";
import ironhandService from "../ironhand.service";
import hercleusVaultService from "./vault.service";

const rebalance = async (chains: number[]) => {
    try {
        // get the recent apyData from the Iron Hand
        const poolData: PoolInfo[] = await ironhandService.getRecentApys("hercleus");

        // Loop through MainNetworkData array to process different chains.
        for(let chainId of chains) {

            // Get APY datas for the current chain.
            const apyData = poolData.filter((res: PoolInfo) => res.chainId == chainId);;

            if(apyData.length == 0) continue;
            
            // Get the pool with the highest APY on the current chain.
            const topPool: PoolInfo = apyData.reduce((maxObj, obj) => {
                return obj.apy > maxObj.apy ? obj : maxObj;
            }, apyData[0]);
            let topPoolBalance: number = 0;

            // const plugin = getContract(entry.url, pluginAbi, entry.plugin);
            const plugin = getHercleusContractInstance().plugin(chainId);
            // Loop through the tokens in the current chain's entry.
            for(let [tokenName, tokenAddress] of Object.entries(hercleusSupportTokens[chainId])) {
                // If the token is the same as the top pool's token, continue.
                if(tokenAddress == topPool.tokenAddress) continue;
                
                // Get the balance of the token in the user's vault.
                const tokenContract = getTokenContract(chainId, tokenAddress.toString());
                const decimals = await tokenContract.decimals();

                const tokenBalance = await tokenContract.balanceOf(hercleusAddresses[chainId].VAULT);
                const stakedInfo = await plugin.getStakedAmount(tokenAddress);
                
                if((Number(decimals) == 18 && tokenBalance < 1e12) || tokenBalance == 0) {
                    console.log(chainId, tokenAddress, tokenBalance.toString());
                    console.log("Insufficient amount");
                    continue;
                }
                if(tokenBalance > 0) await hercleusVaultService.stakeAsset(chainId, tokenAddress, tokenBalance);
            }
            const tokenContract = getTokenContract(chainId, topPool.tokenAddress);
            topPoolBalance = await tokenContract.balanceOf(hercleusAddresses[chainId].VAULT);
            // Stake the balance of the top pool's token.
            if(topPoolBalance == 0) console.log("Insufficient amount");
            if(topPoolBalance > 0) await hercleusVaultService.stakeAsset(chainId, topPool.tokenAddress, BigInt(topPoolBalance));
        }
        console.log("Rebalance finished.")
    } catch (error) {
        console.log("Rebalance:", error);
    }
}

const claimAllRewards = async () => {
    try {
        for(let chainId of SUPPORT_CHAINS) {
            await hercleusVaultService.claimReward(chainId);
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    } catch (error) {
        console.log("claim all reward:", error);
    }
}

const swapAllRewards = async () => {
    try {
        for(let chainId of SUPPORT_CHAINS) {
            await hercleusVaultService.swapReward(chainId, 1);
        }  
    } catch (error) {
        console.log("swap all rewards:", error);
    }
}

export default { rebalance, claimAllRewards, swapAllRewards };