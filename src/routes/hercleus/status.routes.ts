import express from 'express';
import statusController from '../../controllers/hercleus/status.controller';
import { validateChainId, validateEthereumAddress } from '../../middleware/validate';
const router = express.Router();

router.get("/tvl", statusController.getTvl);
router.get("/lprate", statusController.getCurrentLpRate);
router.get("/lpbalance",validateChainId, validateEthereumAddress, statusController.getMozLPBalance);
router.get("/position", validateEthereumAddress, statusController.getPosition);

export default router;