import { Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { getAccountDetails, ChainType } from '../src/types/index'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import algosdk from 'algosdk'
import WalletConnect from '@walletconnect/client'

const Algorand: NextPage = () => {
    // @ts-ignore
    const AlgoSigner = globalThis.AlgoSigner
    
    useEffect(() => {
        if(typeof AlgoSigner !== 'undefined'){
            console.log('Algorand works')
        }
    }, [])

    const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal
    })

    useEffect(() => {
        connector.on('connect', (err, payload) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            const { accounts } = payload.params[0]
            const currentAccount = accounts[0]
            console.log()
        })
    },[])

    const fetchAccounts = async () => {
        await AlgoSigner.connect({
            ledger: 'TestNet'
        })
        const accounts = await AlgoSigner.accounts({
            ledger: 'TestNet'
        })
        console.log(accounts)
    }

    const connectToMobile = async () => {
        if(!connector.connected){
            await connector.createSession()
        }
        
    }

    return(
        <>
            <Button onClick={fetchAccounts}>Algorand</Button>
            <Button onClick={connectToMobile}>WalletConnect</Button>
        </>
    )
}

export default Algorand