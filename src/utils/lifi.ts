import axios from "axios";
import { LIFI_QUOTE } from "../configs/url.config";
export const getQuote = async (fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: bigint, fromAddress: string, toAddress: string, integrator: any) => {
    try {
        const result = await axios.get(LIFI_QUOTE,{
            params: {
                fromChain,
                toChain,
                fromToken,
                toToken,
                fromAmount: fromAmount.toString(),
                fromAddress,
                toAddress,
                integrator
            }
        });
        return result.data;
    } catch(error) {
        console.log("getQuote:", error.message);
    }
}