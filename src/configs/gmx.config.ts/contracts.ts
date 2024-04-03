import { ethers } from "ethers";
import { ARBITRUM, ARBITRUM_GOERLI, AVALANCHE, AVALANCHE_FUJI, BCS_MAINNET, BCS_TESTNET } from "./chains";

// const { AddressZero } = require("@ethersproject/constants");

export const XGMT_EXCLUDED_ACCOUNTS = [
  "0x330eef6b9b1ea6edd620c825c9919dc8b611d5d5",
  "0xd9b1c23411adbb984b1c4be515fafc47a12898b2",
  "0xa633158288520807f91ccc98aa58e0ea43acb400",
  "0xffd0a93b4362052a336a7b22494f1b77018dd34b",
];

const CONTRACTS: {[key: string]: {[key: string]: string}} = {
  [ARBITRUM_GOERLI]: {
    // arbitrum testnet
    Vault: ethers.constants.AddressZero,
    Router: ethers.constants.AddressZero,
    VaultReader: ethers.constants.AddressZero,
    Reader: ethers.constants.AddressZero,
    GlpManager: ethers.constants.AddressZero,
    RewardRouter: ethers.constants.AddressZero,
    RewardReader: ethers.constants.AddressZero,
    GlpRewardRouter: ethers.constants.AddressZero,
    NATIVE_TOKEN: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    GLP: ethers.constants.AddressZero,
    GMX: ethers.constants.AddressZero,
    ES_GMX: ethers.constants.AddressZero,
    BN_GMX: ethers.constants.AddressZero,
    USDG: ethers.constants.AddressZero,
    ES_GMX_IOU: ethers.constants.AddressZero,

    StakedGmxTracker: ethers.constants.AddressZero,
    BonusGmxTracker: ethers.constants.AddressZero,
    FeeGmxTracker: ethers.constants.AddressZero,
    StakedGlpTracker: ethers.constants.AddressZero,
    FeeGlpTracker: ethers.constants.AddressZero,

    StakedGmxDistributor: ethers.constants.AddressZero,
    StakedGlpDistributor: ethers.constants.AddressZero,

    GmxVester: ethers.constants.AddressZero,
    GlpVester: ethers.constants.AddressZero,

    OrderBook: ethers.constants.AddressZero,
    OrderExecutor: ethers.constants.AddressZero,
    OrderBookReader: ethers.constants.AddressZero,

    PositionRouter: ethers.constants.AddressZero,
    PositionManager: ethers.constants.AddressZero,

    TraderJoeGmxAvaxPool: ethers.constants.AddressZero,
    ReferralStorage: "0x995E905E471D53B7c5d0dbf6406860Cb3C029e95",
    ReferralReader: ethers.constants.AddressZero,

    // Synthetics
    DataStore: "0xbA2314b0f71ebC705aeEBeA672cc3bcEc510D03b",
    EventEmitter: "0x2fbE45fCb58B7106CF0a3Be9225D5Ed5A1004cc4",
    ExchangeRouter: "0xFE98518C9c8F1c5a216E999816c2dE3199f295D2",
    DepositVault: "0x838a9bdf8736eD522A60F5f715e4F3FC2BC91A08",
    WithdrawalVault: "0xaAac001C2a2727Ff2d484C4Ad7d2079C7094e7Ef",
    OrderVault: "0x82aFd2590814a7Ce3d7ea6b63F80481F8b227bA9",
    SyntheticsReader: "0xab747a7bb64B74D78C6527C1F148808a19120475",
    SyntheticsRouter: "0xa960786Bc30F8587279df6116F9E0B15C5b034dE",
    Timelock: ethers.constants.AddressZero,

    Multicall: "0x6d85594c9BD6b0833bC85AE62B360654A1e52D70",

    //
    TheseusVault: "0x0b4407907cF70A9eF4aE6dB1Ae4AcE9F952045D0",
    GmxPlugin: "0x5a45fE9e9084cfBd0f749ACb2b3D202841aDf1BA",
    TokenPriceConsumer: "0x3ccE8566106C75b8Cf5a924E393cA895d16A138b"
  },
  [ARBITRUM]: {
    // arbitrum mainnet
    Vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
    Router: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
    VaultReader: "0xfebB9f4CAC4cD523598fE1C5771181440143F24A",
    Reader: "0x2b43c90D1B727cEe1Df34925bcd5Ace52Ec37694",
    GlpManager: "0x3963FfC9dff443c2A94f21b129D429891E32ec18",
    RewardRouter: "0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1",
    GlpRewardRouter: "0xB95DB5B167D75e6d04227CfFFA61069348d271F5",
    RewardReader: "0x8BFb8e82Ee4569aee78D03235ff465Bd436D40E0",
    NATIVE_TOKEN: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    GLP: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
    GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    ES_GMX: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
    BN_GMX: "0x35247165119B69A40edD5304969560D0ef486921",
    USDG: "0x45096e7aA921f27590f8F19e457794EB09678141",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954",
    StakedGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    BonusGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    FeeGmxTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
    StakedGlpTracker: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
    FeeGlpTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",

    StakedGmxDistributor: "0x23208B91A98c7C1CD9FE63085BFf68311494F193",
    StakedGlpDistributor: "0x60519b48ec4183a61ca2B8e37869E675FD203b34",

    GmxVester: "0x199070DDfd1CFb69173aa2F7e20906F26B363004",
    GlpVester: "0xA75287d2f8b217273E7FCD7E86eF07D33972042E",

    OrderBook: "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB",
    OrderExecutor: "0x7257ac5D0a0aaC04AA7bA2AC0A6Eb742E332c3fB",
    OrderBookReader: "0xa27C20A7CF0e1C68C0460706bB674f98F362Bc21",

    PositionRouter: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
    PositionManager: "0x75E42e6f01baf1D6022bEa862A28774a9f8a4A0C",

    UniswapGmxEthPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E",
    ReferralStorage: "0xe6fab3f0c7199b0d34d7fbe83394fc0e0d06e99d",
    ReferralReader: "0x8Aa382760BCdCe8644C33e6C2D52f6304A76F5c8",

    // Synthetics
    DataStore: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
    EventEmitter: "0xC8ee91A54287DB53897056e12D9819156D3822Fb",
    ExchangeRouter: "0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8",
    DepositVault: "0xF89e77e8Dc11691C9e8757e84aaFbCD8A67d7A55",
    WithdrawalVault: "0x0628D46b5D145f183AdB6Ef1f2c97eD1C4701C55",
    OrderVault: "0x31eF83a530Fde1B38EE9A18093A333D8Bbbc40D5",
    SyntheticsReader: "0xf60becbba223EEA9495Da3f606753867eC10d139",
    SyntheticsRouter: "0x7452c558d45f8afC8c83dAe62C3f8A5BE19c71f6",
    Timelock: "0xaa50bD556CE0Fe61D4A57718BA43177a3aB6A597",

    Multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",


    TheseusVault: "0x9a619568D9960F5CDceA558AA1a6b39839758e06",
    GmxPlugin: "0xDC7030733Ef2FF58CE204Cd4F35Bab57554019Ec",
    TokenPriceConsumer: "0x9525698DD22D02248950464C0187bf1619f8E1Cf"
  },
  [AVALANCHE]: {
    // avalanche
    Vault: "0x9ab2De34A33fB459b538c43f251eB825645e8595",
    Router: "0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8",
    VaultReader: "0x66eC8fc33A26feAEAe156afA3Cb46923651F6f0D",
    Reader: "0x2eFEE1950ededC65De687b40Fd30a7B5f4544aBd",
    GlpManager: "0xD152c7F25db7F4B95b7658323c5F33d176818EE4",
    RewardRouter: "0x82147C5A7E850eA4E28155DF107F2590fD4ba327",
    GlpRewardRouter: "0xB70B91CE0771d3f4c81D87660f71Da31d48eB3B3",
    RewardReader: "0x04Fc11Bd28763872d143637a7c768bD96E44c1b6",
    NATIVE_TOKEN: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    GLP: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
    GMX: "0x62edc0692BD897D2295872a9FFCac5425011c661",
    ES_GMX: "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17",
    BN_GMX: "0x8087a341D32D445d9aC8aCc9c14F5781E04A26d2",
    USDG: "0xc0253c3cC6aa5Ab407b5795a04c28fB063273894",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954", // placeholder address

    StakedGmxTracker: "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342",
    BonusGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    FeeGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    StakedGlpTracker: "0x9e295B5B976a184B14aD8cd72413aD846C299660",
    FeeGlpTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",

    StakedGmxDistributor: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    StakedGlpDistributor: "0xDd593Cf40734199afc9207eBe9ffF23dA4Bf7720",

    GmxVester: "0x472361d3cA5F49c8E633FB50385BfaD1e018b445",
    GlpVester: "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A",

    OrderBook: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
    OrderExecutor: "0x4296e307f108B2f583FF2F7B7270ee7831574Ae5",
    OrderBookReader: "0xccFE3E576f8145403d3ce8f3c2f6519Dae40683B",

    PositionRouter: "0xffF6D276Bc37c61A23f06410Dce4A400f66420f8",
    PositionManager: "0xA21B83E579f4315951bA658654c371520BDcB866",

    TraderJoeGmxAvaxPool: "0x0c91a070f862666bbcce281346be45766d874d98",
    ReferralStorage: "0x827ed045002ecdabeb6e2b0d1604cf5fc3d322f8",
    ReferralReader: "0x505Ce16D3017be7D76a7C2631C0590E71A975083",

    // Synthetics
    DataStore: "0x2F0b22339414ADeD7D5F06f9D604c7fF5b2fe3f6",
    EventEmitter: "0xDb17B211c34240B014ab6d61d4A31FA0C0e20c26",
    ExchangeRouter: "0x11E590f6092D557bF71BaDEd50D81521674F8275",
    DepositVault: "0x90c670825d0C62ede1c5ee9571d6d9a17A722DFF",
    WithdrawalVault: "0xf5F30B10141E1F63FC11eD772931A8294a591996",
    OrderVault: "0xD3D60D22d415aD43b7e64b510D86A30f19B1B12C",
    SyntheticsReader: "0x73BA021ACF4Bb6741E82690DdB821e7936050f8C",
    SyntheticsRouter: "0x820F5FfC5b525cD4d88Cd91aCf2c28F16530Cc68",
    Timelock: "0x4Db91a1Fa4ba3c75510B2885d7d7da48E0209F38",

    Multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
  },

  // [AVALANCHE_FUJI]: {
  //   Vault: AddressZero,
  //   Router: AddressZero,
  //   VaultReader: AddressZero,
  //   Reader: AddressZero,
  //   GlpManager: AddressZero,
  //   RewardRouter: AddressZero,
  //   RewardReader: AddressZero,
  //   GlpRewardRouter: AddressZero,
  //   NATIVE_TOKEN: "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3",
  //   GLP: AddressZero,
  //   GMX: AddressZero,
  //   ES_GMX: AddressZero,
  //   BN_GMX: AddressZero,
  //   USDG: AddressZero,
  //   ES_GMX_IOU: AddressZero,

  //   StakedGmxTracker: AddressZero,
  //   BonusGmxTracker: AddressZero,
  //   FeeGmxTracker: AddressZero,
  //   StakedGlpTracker: AddressZero,
  //   FeeGlpTracker: AddressZero,

  //   StakedGmxDistributor: AddressZero,
  //   StakedGlpDistributor: AddressZero,

  //   GmxVester: AddressZero,
  //   GlpVester: AddressZero,

  //   OrderBook: AddressZero,
  //   OrderExecutor: AddressZero,
  //   OrderBookReader: AddressZero,

  //   PositionRouter: AddressZero,
  //   PositionManager: AddressZero,

  //   TraderJoeGmxAvaxPool: AddressZero,
  //   ReferralStorage: "0x58726dB901C9DF3654F45a37DD307a0C44b6420e",
  //   ReferralReader: AddressZero,

  //   // Synthetics
  //   DataStore: "0xEA1BFb4Ea9A412dCCd63454AbC127431eBB0F0d4",
  //   EventEmitter: "0xc67D98AC5803aFD776958622CeEE332A0B2CabB9",
  //   ExchangeRouter: "0xCD5B8Ea4a848b1c576125f20F9aDe5F58FDf4D4f",
  //   DepositVault: "0x2964d242233036C8BDC1ADC795bB4DeA6fb929f2",
  //   WithdrawalVault: "0x74d49B6A630Bf519bDb6E4efc4354C420418A6A2",
  //   OrderVault: "0x25D23e8E655727F2687CC808BB9589525A6F599B",
  //   SyntheticsReader: "0xA7FF75f85E4fB219ede2FA08Fe4dE1635261de31",
  //   SyntheticsRouter: "0xfD9EA9e7757da026971a28EcA401F9FDc7ACA646",
  //   Timelock: AddressZero,

  //   Multicall: "0x0f53e512b49202a37c81c6085417C9a9005F2196",
  // },
};

export function getContractAddress(chainId: number, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}