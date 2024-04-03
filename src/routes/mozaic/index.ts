import express from 'express';
import nftController from '../../controllers/nft.controller';
import { validateEthereumAddress } from '../../middleware/validate';
const router = express.Router();

router.get("/nfts", validateEthereumAddress, nftController.fetchNFTs);

export default router;