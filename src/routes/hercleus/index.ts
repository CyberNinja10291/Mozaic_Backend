import express from 'express';
import statusRouter from "./status.routes";
import zapRouter from "./zap.routes";

const router = express.Router();

router.use('/status', statusRouter);
router.use('/zap', zapRouter);
export default router;