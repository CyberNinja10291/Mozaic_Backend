import { ethers } from "ethers"
import { gmxAddresses, hercleusAddresses, theseusAddresses } from "../constants/contract";
import { ARBITRUM } from "../constants/chains";
import { getProvider, getTurnkeySigner } from "../utils/ethers.utils";
import { gmxABIs, hercleusABIs, theseusABIs, tokenABI } from "./abis.config";

const getHercleusContractInstance = () => {
    
    const getController = () => new ethers.Contract(
        hercleusAddresses.CONTROLLER,
        hercleusABIs.CONTROLLER,
        getProvider(ARBITRUM)
    );
    
    const getVault = (chainId: number) => new ethers.Contract(
        hercleusAddresses[chainId].VAULT,
        hercleusABIs.VAULT,
        getProvider(chainId)
    );

    const getMozLP = (chainId: number) => new ethers.Contract(
        hercleusAddresses[chainId].MOZLP,
        hercleusABIs.MOZLP,
        getProvider(chainId)
    );

    const getPlugin = (chainId: number) => new ethers.Contract(
        hercleusAddresses[chainId].PLUGIN,
        hercleusABIs.PLUGIN,
        getProvider(chainId)
    );

    return {
        controller: getController,
        vault: getVault,
        mozlp: getMozLP,
        plugin: getPlugin
    }
};

const getTheseusContractInstance = (chainId: number = ARBITRUM) => {
    const getVault = () => new ethers.Contract(
        theseusAddresses[chainId].VAULT,
        theseusABIs.VAULT,
        getProvider(chainId)
    );

    const getPlugin = () => new ethers.Contract(
        theseusAddresses[chainId].PLUGIN,
        theseusABIs.PLUGIN,
        getProvider(chainId)
    );

    const getPriceConsumer = () => new ethers.Contract(
        theseusAddresses[chainId].PRICE_CONSUMER,
        theseusABIs.PRICECONSUMER,
        getProvider(chainId)
    );

    const getCallBack = () => new ethers.Contract(
        theseusAddresses[chainId].CALLBACK,
        theseusABIs.CALLBACK,
        getProvider(chainId)
    );

    return {
        vault: getVault,
        plugin: getPlugin,
        priceConumer: getPriceConsumer,
        callback: getCallBack
    }
}

const getGMXContractInstance = (chainId: number = ARBITRUM) => {
    const getDataStore = () => new ethers.Contract(
        gmxAddresses.DataStore,
        gmxABIs.DATASTORE,
        getProvider(chainId)
    );

    const getReader = () => new ethers.Contract(
        gmxAddresses.SyntheticsReader,
        gmxABIs.READER,
        getProvider(chainId)
    );

    return {
        dataStore: getDataStore,
        reader: getReader
    }
}

const getTokenContractInstance = (chainId: number = ARBITRUM, tokenAddress: string) => new ethers.Contract(
    tokenAddress,
    tokenABI,
    getProvider(chainId)
);

export { getHercleusContractInstance, getTheseusContractInstance, getGMXContractInstance, getTokenContractInstance }    