import { ethers } from "ethers";
import rewardService from "./reward.service";

import { getTokenBalance } from "../../utils/tokenInfo";
import lifiService from "../lifiswap.service";
import { HercleusActionType } from "../../constants/enums";
import ironhandService from "../ironhand.service";
import { RewardInfo } from "../../types/hercleus";
import { TokenInfo } from "../../types/mozaic";
import { getHercleusContractInstance } from "../../configs/contracts.config";
import { getProvider, getTurnkeySigner } from "../../utils/ethers.utils";
import { hercleusAddresses, hercleusTokenData } from "../../constants/contract";
import { configDotenv } from "dotenv";
configDotenv();


// This function stakes a specified amount of a token on a given chain.
const stakeAsset = async (chainId: number, tokenAddress: string, amount: bigint) => {
    try {
        // Get the current token balance in the user's vault on the specified chain.
        const tokenBalance = await getTokenBalance(chainId, tokenAddress, hercleusAddresses[chainId].VAULT);
        // Check if the specified amount is greater than the available token balance.
        if(amount > tokenBalance) return;
        
        // Get the vault contract instance and set the provider.
        const vault = getHercleusContractInstance().vault(chainId);
        const signer = getTurnkeySigner(chainId);
        const payload = ethers.utils.defaultAbiCoder.encode(
            ['uint256', 'address'],
            [amount, tokenAddress],
        );

        const provider = getProvider(chainId);
        let gasPriceWei = await provider.getGasPrice();
        console.log("price", gasPriceWei.toString());
        console.log("Stake asset", chainId, tokenAddress, amount.toString());
        
        // Send a transaction to stake the specified amount of the token.
        const tx = await vault.connect(signer).execute(1, HercleusActionType.Stake, payload, {gasPrice: gasPriceWei});
        await tx.wait();
        console.log("staked");
    } catch (error) {
        console.log("Stake Asset: ", error);
    }
}

// This function unstakes a specified amount of a token on a given chain.
const unstakeAsset = async (chainId: number, tokenAddress: string, amountLP: bigint) => {
    try {
        // Get the vault contract instance.
        // Get the vault contract instance and set the provider.
        const vault = getHercleusContractInstance().vault(chainId);
        const signer = getTurnkeySigner(chainId);

        // Get the plugin contract instance and set the provider.
        const plugin = getHercleusContractInstance().plugin(chainId);

        // Get information about the staked amount for the specified token.
        const stakedAmountInfo = await plugin.getStakedAmount(tokenAddress);

        // Check if the specified amount is greater than the available staked amount.
        if(BigInt(amountLP) > stakedAmountInfo[1]) {
            console.log("Insufficient LP amount");
            return;
        }

        // Encode the payload for the 'execute' function call on the vault contract.
        const payload = ethers.utils.defaultAbiCoder.encode(
            ['uint256', 'address'],
            [amountLP, tokenAddress],
        );
        const provider = getProvider(chainId);
        const gasPriceWei = await provider.getGasPrice();
        console.log("price", gasPriceWei.toString());
        console.log("Unstake asset", chainId, tokenAddress, amountLP.toString());

        // Send a transaction to unstake the specified amount of the token.
        const tx = await vault.connect(signer).execute(1, HercleusActionType.Unstake, payload, {gasPrice: gasPriceWei});
        await tx.wait();
        console.log("unstaked");
    } catch (error) {
        console.log("Unstake Asset: ", error);
    }
}

// This function swaps a specified amount of a token from one chain to another.
const swap = async (srcChainId: number, srcTokenAddress: string, dstChainId: number, dstTokenAddress: string, amount: bigint = BigInt(0)) => {
    try {
        // Get the current token balance in the user's vault on the source chain.
        const tokenBalance = await getTokenBalance(srcChainId, srcTokenAddress, hercleusAddresses[srcChainId].VAULT);
        // Check if the specified amount is greater than the available token balance.
        if(amount > tokenBalance) return;
        if(amount == BigInt(0)) amount = tokenBalance;
        // Perform the token swap using the lifiSwap function.
        await lifiService.hercleusLifiSwap(srcChainId, dstChainId, srcTokenAddress, dstTokenAddress, amount);

        await delay(10000);
    } catch (error) {
        console.log("ERROR", error);
    }
}

// This function swaps a specified amount of reward tokens from one chain to another.
const swapReward = async (srcChainId: any, pluginID: number) => {
    try {
        if(pluginID != 1) {
            console.log("Invalid plugin Id");
            return;
        }
        // Get reward information for the source chain and plugin.
        const rewardInfo: RewardInfo = await rewardService.getRewardInfo(srcChainId, pluginID);
        console.log("rewardInfo", rewardInfo);

        const highestToken: string = await ironhandService.getHighestApyTokenAddress(srcChainId);
        console.log("highestToken", highestToken);
        if(highestToken == "0x0000000000000000000000000000000000000000") return;

        // Perform the token swap using the lifiSwap function, swapping reward tokens.
        await lifiService.hercleusLifiSwap(srcChainId, srcChainId, rewardInfo.rewardTokenAddress, highestToken, BigInt(rewardInfo.rewardBalance));
    } catch (error) {
        console.log("SwapReward error: ", error);
    }
}

// This function checks if a specified amount of a token is available in the vault for staking.
const checkVault = async (chainId: any, tokenAddress: string, amountMLP: bigint): Promise<boolean> => {
    // Get the vault contract instance.
    const vault = getHercleusContractInstance().vault(chainId);


    // Get available amount information from the vault contract for the specified token.
    const available = await vault.getAvailbleAmountPerToken(tokenAddress);

    // If available amount is less than the required amount, return false.
    if(available[1] < amountMLP) return false;

    // Return true if the available amount is sufficient.
    return true;
}

const getTokenBalanceByChainId = async (chainId: number, tokenAddress: string): Promise<any> => {
    try {
        // Get the vault contract instance.
        const vault = getHercleusContractInstance().vault(chainId);

        const chainData = hercleusTokenData[chainId];
        const tokenInfo: TokenInfo = Object.values(chainData).find(info => info.address.toLowerCase() === tokenAddress.toLowerCase());
        const decimals = Number(tokenInfo.decimals);

        // Get available amount information from the vault contract for the specified token.
        const available = await vault.getAvailbleAmountPerToken(tokenAddress);
        const div = Math.pow(10, decimals);
        // Return true if the available amount is sufficient.
        return Number(available[0]) / div;
    } catch (error) {
        console.log("Error" ,error);
        return 0;
    }
}

// This function unstakes a specified amount of a token on a given chain.
const claimReward = async (chainId: number) => {
    try {
        console.log(chainId);

        // Get the vault contract instance.
        const vault = getHercleusContractInstance().vault(chainId);
        const signer = getTurnkeySigner(chainId);
        
        const provider = getProvider(chainId);
        const gasPriceWei = await provider.getGasPrice();
        console.log("price", gasPriceWei.toString());

        // Send the transaction with gas price set
        const tx = await vault.connect(signer).claimReward({
            gasPrice: gasPriceWei,
        });
        await tx.wait();
        console.log("claimReward");
    } catch (error) {
 }
}
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default { stakeAsset, unstakeAsset, swap, swapReward, checkVault, getTokenBalanceByChainId, claimReward };