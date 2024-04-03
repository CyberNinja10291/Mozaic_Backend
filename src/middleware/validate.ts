import { Request, Response, NextFunction } from "express";
import { isEthereumAddress } from "../utils/validate";
import { SUPPORT_CHAINS } from "../constants/chains";

const validateEthereumAddress = (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.query;

    if (!address || !isEthereumAddress(address as string)) {
        return res.status(400).json({
            status: "failure",
            message: "Invalid Ethereum address parameter",
        });
    }

    // If the Ethereum address is valid, proceed to the next middleware
    next();
}

const validateChainId = (req: Request, res: Response, next: NextFunction) => {
    const { chainId } = req.query;

    // Check if chainId is missing or not a number
    if (!chainId || isNaN(Number(chainId))) {
        return res.status(400).json({
            status: "failure",
            error: {
                message: "Invalid or missing chainId",
            },
        });
    }

    const chainIdNumber = Number(chainId);

    // Check if the chainId is in the list of supported chains
    const isExist = SUPPORT_CHAINS.includes(chainIdNumber);
    if (!isExist) {
        return res.status(400).json({
            status: "failure",
            error: {
                message: "Unsupported chainId",
            },
        });
    }

    // If the chainId is valid, proceed to the next middleware
    next();
}


export { validateEthereumAddress, validateChainId }