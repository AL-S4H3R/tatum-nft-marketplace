import algosdk from 'algosdk'

enum ChainType {
    MainNet = 'mainnet',
    TestNet = 'testnet',
    BetaNet = 'betanet'
}
/*
    Pass the chainType and get client url for the same.
*/
const mainnetClientUrl = 'https://node.algoexplorerapi.io/v2'
const testnetClientUrl = 'https://node.testnet.algoexplorerapi.io/v2'

const mainnetClient = new algosdk.Algodv2(mainnetClientUrl)
const testnetClient = new algosdk.Algodv2(testnetClientUrl)

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

const getAccountDetails = async (
    chain: ChainType,
    address: string
) => {
    const algoClient = await getClient(chain)
    const accountInfo =  await algoClient
                                .accountInformation(address)
                                .setIntDecoding(algosdk.IntDecoding.BIGINT)
                                .do()
    const algoBalance = accountInfo.amount as bigint
    console.log(algoBalance)
}

export {
    getClient,
    getAccountDetails,
    ChainType
}