import express from 'express';
import cors from "cors";
import router from './routes';
import Moralis from "moralis";
import { init, update } from './utils/estimate';
import archimedesService from "./services/hercleus/archimedes.service";
import lifiService from "./services/lifiswap.service";

import hercluesStrategyService from "./services/hercleus/strategy.service";
import hercluesVaultService from "./services/hercleus/vault.service";
import hercluesControllerService from "./services/hercleus/controller.service";

import theseusStrategyService from "./services/theseus/strategy.service";
import theseusVaultService from "./services/theseus/vault.service";

import { ARBITRUM, FANTOM, POLYGON } from './constants/chains';
import { TheseusTokenData, hercleusTokenData } from './constants/contract';
import { configDotenv } from 'dotenv';
configDotenv();

const INTERVAL_PERIOD = 1000 * 60 * 10;

const app = express();

app.use(cors());
app.use("/api", router);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is Running On port 5000');
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});


// archimedesService.archimedes();
// archimedesService.sendRequests();
// init();
// setInterval(async () => {
//   await update();
// }, INTERVAL_PERIOD)

///////////////////////////////////////// Hercleus Functions /////////////////////////////////////////

// hercluesControllerService.updateHercleus();
// hercluesControllerService.settleHercleus();
// hercluesStrategyService.rebalance([POLYGON]);
// hercluesStrategyService.claimAllRewards();
// hercluesStrategyService.swapAllRewards();

// lifiService.hercleusLifiSwap(ARBITRUM, FANTOM, hercleusTokenData[ARBITRUM]["USDC.e"].address, hercleusTokenData[FANTOM].USDC.address, BigInt(10000));
// hercluesVaultService.claimReward(ARBITRUM);
// hercluesVaultService.swapReward(ARBITRUM, 1);
// hercluesVaultService.unstakeAsset(ARBITRUM, hercleusTokenData[ARBITRUM]["USDC.e"].address, BigInt(10000));


///////////////////////////////////////// Theseus  Functions /////////////////////////////////////////

// theseusStrategyService.stakeToken(1, 1, TheseusTokenData[ARBITRUM].WBTC.address, BigInt(10000));
// theseusStrategyService.stakeTokens(1, 1, [TheseusTokenData[ARBITRUM].WBTC.address, TheseusTokenData[ARBITRUM].USDC.address], [BigInt(10000), BigInt(10000)]);
// theseusStrategyService.unstakeTokens(1, 1, BigInt(10000));
// theseusVaultService.withdrawProtocolFee(TheseusTokenData[ARBITRUM].USDC.address);

// lifiService.theseusLifiSwap(TheseusTokenData[ARBITRUM].SOL.address, TheseusTokenData[ARBITRUM].USDC.address, BigInt(100000));
// theseusVaultService.swapAsset(TheseusTokenData[ARBITRUM].SOL.address, TheseusTokenData[ARBITRUM].USDC.address, BigInt(100000));

export default app;
