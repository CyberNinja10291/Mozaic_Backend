import { ethers }  from "ethers";
import { ARBITRUM, RPC_PROVIDERS } from "../constants/chains";
import { TurnkeySigner } from "@turnkey/ethers";
import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { tokenABI } from "../configs/abis.config";

export const getProvider = (chainId: number = ARBITRUM) => {
    const url = RPC_PROVIDERS[chainId][0];
    const provider: any = new ethers.providers.JsonRpcProvider(url);
    return provider;
}

export const getContract = (chainId: number, contractAbi: any, contractAddress: string) => {
    const provider: any = getProvider(chainId);
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    return contract;
}

export const getContractWithSigner = (chainId: number, contractAbi: any, contractAddress: string, privateKey: string | any) => {
    const signer = getSigner(chainId, privateKey);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
}

export const getSigner = (chainId: number, privateKey: string | any) => {
    const provider: any = getProvider(chainId);
    const signer = new ethers.Wallet(privateKey, provider);
    return signer;
}

export const getTurnkeySigner = ( 
    chainId: number = ARBITRUM
  ): TurnkeySigner => {
    const provider = getProvider(chainId);
    const turnkeyClient = new TurnkeyClient(
      {
        baseUrl: process.env.BASE_URL!,
      },
      new ApiKeyStamper({
        apiPublicKey: process.env.API_PUBLIC_KEY!,
        apiPrivateKey: process.env.API_PRIVATE_KEY!,
      })
    );
  
    // Initialize a Turnkey Signer
    const turnkeySigner = new TurnkeySigner({
      client: turnkeyClient,
      organizationId: process.env.ORGANIZATION_ID!,
      signWith: process.env.PRIVATE_KEY_ID!,
    });
  
    return turnkeySigner.connect(provider);
}

export const getTokenContract = (chainId: number, tokenAddress: string) => getContract(chainId, tokenABI, tokenAddress);