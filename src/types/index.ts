import algosdk from 'algosdk'

enum ChainType {
    MainNet = 'mainnet',
    TestNet = 'testnet',
    BetaNet = 'betanet'
}
/*
    Pass the chainType and get client url for the same.
*/
const mainnetClient = 'https://node.algoexplorerapi.io/v2'
const testnetClient = 'https://node.testnet.algoexplorerapi.io/v2'

const getClient = async (chainType: ChainType) => {
    switch(chainType){
        case ChainType.MainNet:
            return (mainnetClient)
        case ChainType.TestNet:
            return (testnetClient)
        default:
            throw new Error(`Chain ${chainType} doesn't exist`) 
    }
}

export {
    getClient,
    ChainType
}