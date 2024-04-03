import express from 'express';
import zapController from '../../controllers/theseus/zap.controller';
const router = express.Router();

router.get("/selectDepositToken", zapController.selectDepositToken);
router.get("/selectWithdrawalPluginAndPool", zapController.selectWithdrawalPluginAndPool);
router.get("/estimateTokenAmount", zapController.estimateTokenAmout)

export default router;