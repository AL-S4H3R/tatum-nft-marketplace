import type { NextPage } from 'next'
import { useAlgorand } from '../src/hooks/useAlgorand'
import algosdk from 'algosdk'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import Avatar from '../src/components/Avatar'

const Algorand: NextPage = () => {
    
    const { accounts, connect, error, connector, isConnected } = useAlgorand()

    const shortenAddress = (address: string) => `${address.slice(0,6)}...${address.slice(-6)}`
    
    const testTransactions = async () => {
        const algodClient = new algosdk.Algodv2("", "https://api.testnet.algoexplorer.io", "")
        let suggestedParams = await algodClient.getTransactionParams().do()
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: accounts[0],
            to: '2OAHI424WK2G5DJCXLJWONAZEJBCOXPZ2NSPCIUHMFKEEFVM65Q3EBCA44',
            amount: 100000,
            suggestedParams,
        });
        const txns = [txn]
        const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
            return {
                txn: encodedTxn,
                message: 'test transaction'
            }
        })

        const requestParams = [txnsToSign]
        const txRequest = formatJsonRpcRequest('algo_signTxn', requestParams)
        const result: Array<string | null> = await connector?.sendCustomRequest(txRequest)
        const decodedResult = result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        console.log(decodedResult.toString())
    }

    const createNft = async () => {
        const algodClient = new algosdk.Algodv2("", "https://api.testnet.algoexplorer.io", "")
        let suggestedParams = await algodClient.getTransactionParams().do()
        let createNftTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: accounts[0],
            decimals: 1,
            defaultFrozen: false,
            suggestedParams,
            total: 1
        })
        const txns = [createNftTxn]
        const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
            return {
                txn: encodedTxn,
                message: 'Creating an NFT'
            }
        })
        const requestParams = [txnsToSign]
        const txRequest = formatJsonRpcRequest('algo_signTxn', requestParams)
        const result: Array<string | null> = await connector?.sendCustomRequest(txRequest)
        const rawSignedTxn = result.map(element => {
            return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
        // @ts-ignore
        const completedTxn = await algodClient.sendRawTransaction(rawSignedTxn).do()
        let txId = completedTxn.txId
    }

    if(error){
        return(
            <div className='fixed top-0 bg-red-800 text-white'>
                <p>{JSON.stringify(error)}</p>
            </div>
        )
    }

    return(
        <div className='layout' style={{ fontFamily: 'Ubuntu Mono' }}>
            <nav className='nav'>
                <h1 className='w-1/3 text-3xl'>vybe.nft</h1>
                <div className='w-1/3 justify-center flex'>
                    <ul className='flex space-x-12'>
                        <li className='navlink'>Markets</li>
                        <li className='navlink'>Discord</li>
                        <li className='navlink'>FAQ's</li>
                    </ul>
                </div>
                {
                    isConnected ?
                    <div className='w-1/3 flex items-center justify-end space-x-4'>
                        <Avatar/>
                        <p>
                        {shortenAddress(accounts[0])}
                        </p>
                    </div> :
                    <button className='btn' onClick={connect}>
                        Login
                    </button>
                }
            </nav>
            <section className='px-8'>
                <button className='btn' onClick={testTransactions}>Deploy NFT</button>
                <button className='btn' onClick={createNft}>Create Asset</button>
            </section>
        </div>
    )
}

export default Algorand