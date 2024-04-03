import { ethers } from "ethers";
import { getTheseusContractInstance } from "../../configs/contracts.config";
import { getProvider, getTurnkeySigner } from "../../utils/ethers.utils";
import { TheseusActionType, DecreasePositionSwapType, OrderType } from "../../constants/enums";
import { ARBITRUM } from "../../constants/chains";
import { theseusAddresses } from "../../constants/contract";

const stakeAsset = async (pluginId: number, poolId: number, tokens: string[], amounts: bigint[]) => {
    const vaultContract = getTheseusContractInstance().vault();
    // Encode payload for stake action
    const _payload = ethers.utils.defaultAbiCoder.encode(['uint256'], [0]);
    const payload = ethers.utils.defaultAbiCoder.encode(['uint8', 'address[]', 'uint256[]', 'bytes'], [poolId, tokens, amounts, _payload]);
    console.log("payload", _payload, payload)
    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());

    // Execute stake action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).execute(pluginId, TheseusActionType.Stake, payload, { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("staked");
}

const unstakeAsset = async (pluginId: number, poolId: number, marketAmount: bigint) => {
    const vaultContract = getTheseusContractInstance().vault();
    // Encode payload for unstake action
    const _payload = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256'], [0, 0]);
    const payload = ethers.utils.defaultAbiCoder.encode(['uint8', 'uint256', 'uint256', 'address', 'bytes'], [poolId, marketAmount, 0, vaultContract.address, _payload]);
    console.log("payload", _payload, payload);
    
    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());

    // Execute unstake action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).execute(pluginId, TheseusActionType.Unstake, payload, { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("unstaked");
}

const swapAsset = async (fromToken: string, toToken: string, tokenAmount: bigint) => {
    if(tokenAmount == BigInt(0)) return;
    const gmxPluginContract = getTheseusContractInstance().plugin();
    const pools = await gmxPluginContract.getPools();

    console.log("pools", pools);
    let market = "";
    for(const pool of pools) {
        if(pool.longToken.toLocaleLowerCase() == fromToken.toLocaleLowerCase() && pool.shortToken.toLocaleLowerCase() == toToken.toLocaleLowerCase()) {
            market = pool.marketToken;
            break;
        }
        if(pool.shortToken.toLocaleLowerCase() == fromToken.toLocaleLowerCase() && pool.longToken.toLocaleLowerCase() == toToken.toLocaleLowerCase()) {
            market = pool.marketToken;
            break;
        }
    }
    if(market == "") {
        console.log("unsupport token");
        return;
    }
    console.log("Market token", market);

    const swapPath: string[] = [market];
    const referralCode  = ethers.constants.HashZero;
    const executionFee = ethers.utils.parseUnits("3", 15);
    const params = {
        addresses: {
            receiver: theseusAddresses[ARBITRUM].VAULT,
            callbackContract: theseusAddresses[ARBITRUM].CALLBACK,
            uiFeeReceiver: theseusAddresses[ARBITRUM].VAULT,
            market: ethers.constants.AddressZero,
            initialCollateralToken: fromToken,
            swapPath: swapPath,
        },
        numbers: {
            sizeDeltaUsd: 0,
            initialCollateralDeltaAmount: tokenAmount,
            triggerPrice: 0,
            acceptablePrice: 0,
            executionFee: executionFee,
            callbackGasLimit: "2000000",
            minOutputAmount: 0,
        },
        orderType: OrderType.MarketSwap,
        decreasePositionSwapType: DecreasePositionSwapType.NoSwap,
        isLong: false,
        shouldUnwrapNativeToken: false,
        referralCode: referralCode,
    }
    const payload = ethers.utils.defaultAbiCoder.encode([
        'tuple(tuple(address,address,address,address,address,address[]),uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint8,uint8,bool,bool,bytes32)',
        ], 
        [[
            [
                params.addresses.receiver,
                params.addresses.callbackContract,
                params.addresses.uiFeeReceiver,
                params.addresses.market,
                params.addresses.initialCollateralToken,
                params.addresses.swapPath,
            ],
            params.numbers.sizeDeltaUsd,
            params.numbers.initialCollateralDeltaAmount,
            params.numbers.triggerPrice,
            params.numbers.acceptablePrice,
            params.numbers.executionFee,
            params.numbers.callbackGasLimit,
            params.numbers.minOutputAmount,
            params.orderType,
            params.decreasePositionSwapType,
            params.isLong,
            params.shouldUnwrapNativeToken,
            params.referralCode
        ]]
    );

    console.log("swap payload", payload);
    const vaultContract = getTheseusContractInstance().vault();

    const pluginId = 1;
    
    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());

    let tx = await vaultContract.connect(signer).approveTokens(pluginId, [fromToken], [BigInt(tokenAmount)], { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("approved");

    // Execute unstake action and wait for transaction confirmation
    tx = await vaultContract.connect(signer).execute(pluginId, TheseusActionType.SwapTokens, payload, { gasPrice: gasPriceGwei});
    await tx.wait();
    console.log("swap finished");
}

const getTheseusPoolIdByLongToken = async (token: string): Promise<number> => {
    const gmxPluginContract = getTheseusContractInstance().plugin();
    const pools = await gmxPluginContract.getPools();
    for(const pool of pools) {
        if(pool.longToken == token) return pool.poolId;
    }
    return -1;
}

const claimReward = async (pluginId: number) => {
    const vaultContract = getTheseusContractInstance().vault();
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());

    const tx = await vaultContract.connect(signer).execute(pluginId, TheseusActionType.ClaimRewards, "0x", { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("claim reward");
}

const approveTokens = async (pluginId: number, tokens: string[], amounts: bigint[]) => {
    const vaultContract = getTheseusContractInstance().vault();

    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());
    // Execute approveTokens action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).approveTokens(pluginId, tokens, amounts, { gasPrice: gasPriceGwei });
    await tx.wait();
}

const transferExecutionFee = async (pluginId: number, amount: bigint) => {
    const vaultContract = getTheseusContractInstance().vault();

    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());
    // Execute transferExecutionFee action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).transferExecutionFee(pluginId, amount, { gasPrice: gasPriceGwei });
    await tx.wait();
}

const withdrawProtocolFee = async (token: string) => {
    const vaultContract = getTheseusContractInstance().vault();

    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());
    // Execute withdrawProtocolFee action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).withdrawProtocolFee(token, { gasPrice: gasPriceGwei });
    await tx.wait();
}

const selectPluginAndPool = async (pluingId: number, poolId: number) => {
    const vaultContract = getTheseusContractInstance().vault();
    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());
    // Execute withdrawProtocolFee action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).selectPluginAndPool(pluingId, poolId, { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("finished");
}

const selectExecutionFee = async (depositFee: number, withdrawFee: bigint) => {
    const vaultContract = getTheseusContractInstance().vault();
    
    // Get provider and gas price
    const provider = getProvider();
    const gasPriceGwei = await provider.getGasPrice();

    const signer = getTurnkeySigner(ARBITRUM);
    console.log(await signer.getAddress());

    // Execute withdrawProtocolFee action and wait for transaction confirmation
    const tx = await vaultContract.connect(signer).setExecutionFee(depositFee, withdrawFee, { gasPrice: gasPriceGwei });
    await tx.wait();
    console.log("set");
}

export default { stakeAsset, unstakeAsset, swapAsset, claimReward, approveTokens, transferExecutionFee, withdrawProtocolFee, selectPluginAndPool, selectExecutionFee };
