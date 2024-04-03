import { getHercleusContractInstance } from "../../configs/contracts.config";
import { getTurnkeySigner } from "../../utils/ethers.utils";

const updateHercleus = async () => {
    // Call the update function of the contract
    const controller = getHercleusContractInstance().controller();
    const signer = getTurnkeySigner();
    const gasLimit = 2500000;
    const tx = await controller.connect(signer).updateAssetState({gasLimit});
    await tx.wait();
    console.log("updated");
}

const settleHercleus = async () => {
    // Call the settle function of the contract
    const controller = getHercleusContractInstance().controller();
    const signer = getTurnkeySigner();
    const gasLimit = 2500000;
    const tx = await controller.connect(signer).settleAllVaults({gasLimit});
    await tx.wait();
    console.log("settled");
}

const requestSnapshot = async (chainId: any) => {
    // Call the request snapshot function of the contract
    const controller = getHercleusContractInstance().controller();
    const signer = getTurnkeySigner();
    const tx = await controller.connect(signer).requestSnapshot(chainId);
    await tx.wait();
    console.log("requestsnapshot");
}

const requestSettle = async (chainId: any) => {
    // Call the request settle function of the contract
    const controller = getHercleusContractInstance().controller();
    const signer = getTurnkeySigner();
    const tx = await controller.connect(signer).requestSettle(chainId);
    await tx.wait();
    console.log("requestsettle");
}

const getProtocolStatus =  async (): Promise<number | undefined> => {
    try {
        const controller = getHercleusContractInstance().controller();
        let status =  await controller.protocolStatus();
        return status;
    } catch (error) {
        console.log(error);
    }
}

export default {
    updateHercleus,
    settleHercleus,
    requestSnapshot,
    requestSettle,
    getProtocolStatus
}