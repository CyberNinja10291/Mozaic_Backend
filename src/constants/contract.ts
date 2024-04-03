import { TokenInfo } from "../types/mozaic"
import { ARBITRUM, AVALANCHE, BCS_MAINNET, FANTOM, POLYGON } from "./chains"

const hercleusAddresses = {
    CONTROLLER: "0x338D0C7b59b1b1A2b82090B748bBe584fBf32f40",
    [ARBITRUM]: {
        VAULT: "0x8BfED25d58d4c38a3A9BCa1aC45bcFD866A3a88c",
        MOZLP: "0x2e8751Fcd698B0A0704a04515667229e7843fa58",
        PLUGIN: "0xCb85d13ffe02305B9517BCD74534727c329f440e",
        LPSTAKING: "0x9774558534036Ff2E236331546691b4eB70594b1"
    },
    [FANTOM]: {
        VAULT: "0x139b227B7Fc46CE6AB2efE7cE6463DD97E6b0A7A",
        MOZLP: "0xb5fa6e6498aDdcF4Ff13BD032400a05Bbe424a4f",
        PLUGIN: "0x457B405abB4cC400825A2a2C47A2c3C223A63C2d",
        LPSTAKING: "0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03"
    },
    [POLYGON]: {
        VAULT: "0x5712ab97A299a8A4544BCc728B7f3E9663965443",
        MOZLP: "0xeBcFDAf4Cf594f74d7c70a78d41e1b8a2006e23A",
        PLUGIN: "0x0a4B94fd39Ce7A61a721410765AedAf52621c988",
        LPSTAKING: "0x8731d54E9D02c286767d56ac03e8037C07e01e98"
    },
    [BCS_MAINNET]: {
        VAULT: "0x5712ab97A299a8A4544BCc728B7f3E9663965443",
        MOZLP: "0xeBcFDAf4Cf594f74d7c70a78d41e1b8a2006e23A",
        PLUGIN: "0x0a4B94fd39Ce7A61a721410765AedAf52621c988",
        LPSTAKING: "0x3052A0F6ab15b4AE1df39962d5DdEFacA86DaB47"
    },
    [AVALANCHE]: {
        VAULT: "0x5712ab97A299a8A4544BCc728B7f3E9663965443",
        MOZLP: "0xeBcFDAf4Cf594f74d7c70a78d41e1b8a2006e23A",
        PLUGIN: "0x0a4B94fd39Ce7A61a721410765AedAf52621c988",
        LPSTAKING: "0x8731d54E9D02c286767d56ac03e8037C07e01e98"
    },  
}

const hercleusSupportTokens = {
    [ARBITRUM] : {
        "USDC.e": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        "USDT": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", 
    },
    [FANTOM] : {
        "USDC": "0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf",
    },
    [POLYGON] : {
        "USDC": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        "USDT": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        "DAI" : "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    [BCS_MAINNET] : {
        "USDT": "0x55d398326f99059ff775485246999027b3197955",
    },
    [AVALANCHE] : {
        "USDC": "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
        "USDT": "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    },
}

const theseusAddresses = {
    [ARBITRUM]: {
        VAULT: "0x9a619568d9960f5cdcea558aa1a6b39839758e06",
        PLUGIN: "0xDC7030733Ef2FF58CE204Cd4F35Bab57554019Ec",
        PRICE_CONSUMER: "0x9525698DD22D02248950464C0187bf1619f8E1Cf",
        CALLBACK: "0xC390e1DFeaF825c1995480429Ff18e59DC04eC9B",
    },
}

const gmxAddresses = {
    DataStore: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
    EventEmitter: "0xC8ee91A54287DB53897056e12D9819156D3822Fb",
    ExchangeRouter: "0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8",
    DepositVault: "0xF89e77e8Dc11691C9e8757e84aaFbCD8A67d7A55",
    WithdrawalVault: "0x0628D46b5D145f183AdB6Ef1f2c97eD1C4701C55",
    OrderVault: "0x31eF83a530Fde1B38EE9A18093A333D8Bbbc40D5",
    SyntheticsReader: "0xf60becbba223EEA9495Da3f606753867eC10d139",
    SyntheticsRouter: "0x7452c558d45f8afC8c83dAe62C3f8A5BE19c71f6",
    Timelock: "0xaa50bD556CE0Fe61D4A57718BA43177a3aB6A597",
}

const hercleusTokenData: {[key: number]: {[key: string]: TokenInfo}} = {
    [ARBITRUM]: {
        "USDC.e": {
            address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
            decimals: 6
        },
        "USDT": {
            address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
            decimals: 6
        } 
    },
    [BCS_MAINNET]: {
        "USDT": {
            address: "0x55d398326f99059ff775485246999027b3197955",
            decimals: 18
        } 
    },
    [POLYGON]: {
        "USDC": {
            address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
            decimals: 6
        },
        "USDT": {
            address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
            decimals: 6
        },
        "DAI": {
            address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
            decimals: 18
        }
    },
    [AVALANCHE]: {
        "USDC": {
            address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
            decimals: 6
        },
        "USDT": {
            address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
            decimals: 6
        }
    },
    [FANTOM]: {
        "USDC": {
            address: "0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf",
            decimals: 6
        }
    },
}

export const TheseusTokenData: {[key: number]: {[key: string]: TokenInfo}} = {
    [ARBITRUM]: {
        "ETH": {
            address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            decimals: 18
        },
        "BTC": {
            address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
            decimals: 8
        },
        "WBTC.b": {
            address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
            decimals: 8
        },
        "DOGE": {
            address: "0xC4da4c24fd591125c3F47b340b6f4f76111883d8",
            decimals: 8
        },
        "LTC": {
            address: "0xB46A094Bc4B0adBD801E14b9DB95e05E28962764",
            decimals: 8
        },
        "SOL": {
            address: "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
            decimals: 9
        },
        "UNI": {
            address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
            decimals: 18
        },
        "LINK": {
            address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
            decimals: 18
        },
        "ARB": {
            address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
            decimals: 18
        },
        "XRP": {
            address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
            decimals: 6
        },
        "USDC": {
            address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            decimals: 6
        },
        "USDC.e": {
            address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
            decimals: 6
        },
        "USDT": {
            address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
            decimals: 6
        },
        "DAI": {
            address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
            decimals: 18
        },
        "BNB": {
            address: "0xa9004A5421372E1D83fB1f85b0fc986c912f91f3",
            decimals: 18
        },
        "ATOM": {
            address: "0x7D7F1765aCbaF847b9A1f7137FE8Ed4931FbfEbA",
            decimals: 6
        },
        "NEAR": {
            address: "0x1FF7F3EFBb9481Cbd7db4F932cBCD4467144237C",
            decimals: 24
        },
        "AAVE": {
            address: "0xba5DdD1f9d7F570dc94a51479a000E3BCE967196",
            decimals: 18
        },
        "AVAX": {
            address: "0x565609fAF65B92F7be02468acF86f8979423e514",
            decimals: 18
        },
        "OP": {
            address: "0xaC800FD6159c2a2CB8fC31EF74621eB430287a5A",
            decimals: 18
        }
    }
};

export { hercleusAddresses, hercleusSupportTokens, theseusAddresses, gmxAddresses, hercleusTokenData }