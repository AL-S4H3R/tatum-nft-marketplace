import { Button, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAccountDetails, ChainType } from '../src/types/index'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import algosdk from 'algosdk'
import WalletConnect from '@walletconnect/client'
import { useAlgorand } from '../src/hooks/useAlgorand'

const Algorand: NextPage = () => {
    
    const { accounts, connectAlgoWallet, disconnect } = useAlgorand()
    return(
        <div className='layout'>
            <nav className='nav'>
                <h1>logo</h1>
                <button className='btn' onClick={connectAlgoWallet}>
                    Login
                </button>
                {/* <button onClick={disconnect}>Disconnect</button> */}
            </nav>
            {
                accounts && <p>{accounts[0]}</p>
            }
        </div>
    )
}

export default Algorand