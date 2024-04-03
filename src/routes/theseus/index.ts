import express from 'express';
import statusRoutes from './status.routes';
import zapRoutes from './zap.routes';

const router = express.Router();

router.use("/status", statusRoutes);
router.use("/zap", zapRoutes);

export default router;