import express from 'express';
import statusController from "../../controllers/theseus/status.controller"
import { validateEthereumAddress } from '../../middleware/validate';

const router = express.Router();

router.get("/lprate", statusController.getCurrentLpRate);
router.get("/tvl", statusController.getTvl);
router.get("/position", validateEthereumAddress, statusController.getPosition);

export default router;