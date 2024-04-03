import express from 'express';
import hercleus from './hercleus'
import theseus from './theseus'
import mozaic from './mozaic'

const router = express.Router();

router.use("/hercleus", hercleus);
router.use("/theseus", theseus);
router.use("/mozaic", mozaic);


export default router;