import controller from "../abis/hercleus/Controller.json";
import vault from "../abis/hercleus/Vault.json"
import plugin from "../abis/hercleus/StargatePlugin.json"
import lpstaking from "../abis/hercleus/LPStaking.json"
import lpstakingtime from "../abis/hercleus/LPStakingTime.json"
import mozLP from "../abis/hercleus/MozaicLP.json";

import theseusVault from "../abis/theseus/Vault.json";
import gmxPlugin from "../abis/theseus/GmxPlugin.json";
import callback from "../abis/theseus/GmxCallback.json";

import tokenPriceConsumer from "../abis/theseus/TokenPriceConsumer.json";
import dataStore from "../abis/theseus/DataStore.json";
import reader from "../abis/theseus/SyntheticsReader.json";

import tokenABI from "../abis/hercleus/MockToken.json"

const hercleusABIs = {
    CONTROLLER: controller,
    VAULT: vault,
    PLUGIN: plugin,
    LPSTAKING: lpstaking,
    LPSTAKINGTIME: lpstakingtime,
    MOZLP: mozLP
}

const stgABIs = {
    LPSTAKING: lpstaking,
    LPSTAKINGTIME: lpstakingtime
}

const theseusABIs = {
    VAULT: theseusVault,
    PLUGIN: gmxPlugin,
    PRICECONSUMER: tokenPriceConsumer,
    CALLBACK: callback
}

const gmxABIs = {
    DATASTORE: dataStore,
    READER: reader
}

export { hercleusABIs, theseusABIs, stgABIs, gmxABIs, tokenABI };