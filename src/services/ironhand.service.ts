import axios from "axios";
import { ApyInfo, PoolInfo } from "../types/hercleus";
import { GMXPoolInfo } from "../types/theseus";
import { HERCLEUS_IRONHAND, THESEUS_IRONHAND } from "../configs/url.config";
import { error } from "console";

const getRecentApys = async (mode: string): Promise<any[]> => {
    try {
        if(mode == "hercleus") {
            const response: any = await axios.get(`${HERCLEUS_IRONHAND}/api/apy/recent`);
            return response.data.recentApy;
        } else if(mode == "theseus") {
            const url = THESEUS_IRONHAND + "api/apy/recent";
            const result = await axios.get(url);
            return result.data.recentApr;
        } else {
            throw error;
        }
    } catch(error) {
        console.log("Failed to fetch the apys", error.message);
        return [];
    }
}

const getHighestApyTokenAddress = async (chainId: number): Promise<string> => {
    try {

        const response: any = await axios.get(`${HERCLEUS_IRONHAND}/api/apy/recent`);

        const recentApys: ApyInfo[] = response.data.recentApy;
        if(recentApys == undefined) return "0x0000000000000000000000000000000000000000";
        const apyInfoByChainId: ApyInfo[] = recentApys.filter((res: ApyInfo) => res.chainId == chainId);
        if(apyInfoByChainId.length == 0) return "0x0000000000000000000000000000000000000000";
        apyInfoByChainId.sort((a: ApyInfo, b: ApyInfo) => b.apy - a.apy);
        return apyInfoByChainId[0].tokenAddress;
    } catch(error) {
        console.log("get highest token", error.message);
        return  "0x0000000000000000000000000000000000000000";
    }
}

const getHighestApyPool = async (): Promise<GMXPoolInfo> => {
    try {
        const url = THESEUS_IRONHAND + "api/apy/recent";
        const result = await axios.get(url);
        const pools : GMXPoolInfo[] = result.data.recentApr;
        pools.sort((a: GMXPoolInfo, b: GMXPoolInfo) => b.apr.total - a.apr.total);
        return pools[0];
    } catch {
        console.log("Failed to fetch the apys");
        return {
            pluginId: 0, // Default pluginId
            poolId: 0, // Default poolId
            poolName: "",
            marketToken: "", // Default marketToken
            indexToken: "", // Default indexToken
            longToken: "", // Default longToken
            shortToken: "", // Default shortToken
            apr: { // Default apr object
                base: 0,
                bonus: 0,
                total: 0
            },
            gmTokenPrice: 0, // Default gmTokenPrice
            gmTokenAmount: 0, // Default gmTokenAmount
            assetInUsd: 0, // Default assetInUsd
        };
    }
}
export default { getRecentApys, getHighestApyPool, getHighestApyTokenAddress }