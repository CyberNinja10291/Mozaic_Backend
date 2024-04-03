import express from 'express';
import zapController from '../../controllers/hercleus/zap.controller';
import { validateChainId } from '../../middleware/validate';
const router = express.Router();

router.get("/selectDepositToken", validateChainId, zapController.selectDepositToken);
router.get("/selectWithdrawToken", validateChainId, zapController.selectWithdrawToken);

export default router;