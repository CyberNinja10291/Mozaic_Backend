import { getProvider, getTurnkeySigner } from "../utils/ethers.utils";
import { getQuote } from "../utils/lifi";
import { ARBITRUM } from "../constants/chains";
import { hercleusAddresses } from "../constants/contract";
import { theseusAddresses } from "../constants/contract";
import { getHercleusContractInstance } from "../configs/contracts.config";
import { getTheseusContractInstance } from "../configs/contracts.config";
const hercleusLifiSwap = async (fromChainId: number, toChainId: number, fromTokenAddress: string, toTokenAddress: string, fromAmount: bigint) => {
    const fromAddress = hercleusAddresses[fromChainId].VAULT;
    const toAddress = hercleusAddresses[toChainId].VAULT;
    console.log("from -> to", fromAddress, toAddress);

    const vault = getHercleusContractInstance().vault(fromChainId);
    console.log(fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress, toAddress);
    const signer = getTurnkeySigner(fromChainId);
    const quote = await getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress, toAddress, "Mozaic");
    if(quote == undefined) return;
    const transaction =  quote.transactionRequest;
    console.log("transaction", transaction);
    try {

        const provider = getProvider(fromChainId);
        const gasPriceWei = await provider.getGasPrice();
        console.log("price", gasPriceWei.toString());
        const tx = await vault.connect(signer).bridgeViaLifi(fromTokenAddress, fromAmount, transaction.value, transaction.data, {gasPrice: gasPriceWei});
        await tx.wait();
        console.log("tx:::::::", tx);
        console.log("lifi swap finished");

        // if (fromChainId !== toChainId) {
        //     let result;
        //     do {
        //         result = await getStatus(quote.tool, fromChainId, toChainId, tx.transactionHash);
        //         console.log("transfering...");
        //         if(result.status !== 'DONE' && result.status !== 'FAILED') await delay(3000);
        //     } while (result.status !== 'DONE' && result.status !== 'FAILED')
        //     console.log(result.status);
        // }
    } catch (err) {
        console.log("Lifi swap: ", err);
    }
}

const theseusLifiSwap = async (fromTokenAddress: string, toTokenAddress: string, fromAmount: bigint) => {
    const vaultContract: any = getTheseusContractInstance().vault();
    const quote = await getQuote(ARBITRUM, ARBITRUM, fromTokenAddress, toTokenAddress, fromAmount, theseusAddresses[ARBITRUM].VAULT, theseusAddresses[ARBITRUM].VAULT, "Mozaic");
    
    if(quote == undefined) return;
    const transaction =  quote.transactionRequest;
    console.log("transaction", transaction);
    try {
        // Get provider and gas price
        const provider = getProvider(ARBITRUM);
        const gasPriceGwei = await provider.getGasPrice();
        console.log("price", gasPriceGwei.toString());
        const signer = getTurnkeySigner(ARBITRUM);
        console.log("signer address", await signer.getAddress());

        const tx = await vaultContract.connect(signer).bridgeViaLifi(fromTokenAddress, fromAmount, transaction.value, transaction.data, {gasPrice: gasPriceGwei});
        await tx.wait();
        console.log("tx:::::::", tx);
        console.log("lifi swap finished");

        // if (fromChainId !== toChainId) {
        //     let result;
        //     do {
        //         result = await getStatus(quote.tool, fromChainId, toChainId, tx.transactionHash);
        //         console.log("transfering...");
        //         if(result.status !== 'DONE' && result.status !== 'FAILED') await delay(3000);
        //     } while (result.status !== 'DONE' && result.status !== 'FAILED')
        //     console.log(result.status);
        // }
    } catch (err) {
        console.log("LifiSwap_ERROR:", err);
    }
}

export default { hercleusLifiSwap,  theseusLifiSwap }