import { Request, Response } from "express";
import nftService from "../services/hercleus/nft.service";


const fetchNFTs = async (req: Request, res: Response) => {
    try {
        const { address } = req.query;
        if(!address) {
            return res.status(400).json({
                message: "Invalid query",
                status: 400,
            });
        }
    
        const data = await nftService.fetchAllNFTs(address as string);
    
        return res.status(200).json({
            data,
            status: 200
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
}

export default { fetchNFTs };