import { stgABIs, tokenABI } from "../../configs/abis.config";
import { hercleusAddresses } from "../../constants/contract";
import { RewardInfo } from "../../types/hercleus";
import { getContract } from "../../utils/ethers.utils";

const getRewardInfo = async (chainId: number, pluginID: number): Promise<RewardInfo> => {
    let rewardTokenAddress: string = "";
    let rewardBalance: number  = 0;
    let rewardDecimals: number = 0;
    if(pluginID == 1) {
        const flag = (chainId == 10 || chainId == 8453 || chainId == 2222 || chainId == 42161);
        const lpstakingABI = flag ? stgABIs.LPSTAKINGTIME : stgABIs.LPSTAKING;
    
        const LPStakingContract = getContract(chainId, lpstakingABI, hercleusAddresses[chainId].LPSTAKING);
        rewardTokenAddress = flag ? await LPStakingContract.eToken() : await LPStakingContract.stargate();
        const rewardToken = getContract(chainId, tokenABI, rewardTokenAddress);
    
        rewardBalance = await rewardToken.balanceOf(hercleusAddresses[chainId].VAULT);
        rewardDecimals = await rewardToken.decimals();
    }

    return {
        rewardTokenAddress,
        rewardBalance,
        rewardDecimals
    };
}

export default { getRewardInfo };