import { createContext, FC, useContext, useEffect, useState } from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'

interface IWalletInstance {
    accounts: string[],
    isConnected: boolean,
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    error?: Error
}

const AlgoContext = createContext<IWalletInstance>({ 
    accounts: [],
    isConnected: false,
    connect: () => new Promise(() => {}),
    disconnect: () => new Promise(() => {})
})

const useAlgo = () => {
    return useContext(AlgoContext)
}

const AlgoContextProvider: FC = ({ children }) => {
    
    const [accounts, setAccounts] = useState<string[]>([])
    const [isConnected, setIsConnected] = useState(false)
    const [error, setError] = useState<Error>()

    const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal
    })

    const connect = async () => {
        if(!connector.connected){
            await connector.createSession()
        }
    }

    const disconnect = async () => {
        if(connector.connected){
            await connector.killSession()
        }
    }

    useEffect(() => {
        if(connector.connected){
            const connectedAccounts = connector.accounts
            setAccounts(connectedAccounts)
            setIsConnected(true)
        }
    }, [])

    // account connection event
    useEffect(() => {
        connector.on('connect', (err, payload) => {
            if(err) {
                setError(err)
                throw new Error(JSON.stringify(err))
            }
            const currentAccounts: string[] = payload.params[0].accounts
            setAccounts(currentAccounts)
        })
    })

    // account disconnect event
    useEffect(() => {
        connector.on('disconnect', (err, _payload) => {
            if(err){
                setError(err)
                throw new Error(JSON.stringify(err))
            }
            setAccounts([])
            setIsConnected(false)
        })
    })

    return(
        <AlgoContext.Provider value={{ 
            accounts, 
            isConnected,
            connect,
            error,
            disconnect
        }}>
            {children}
        </AlgoContext.Provider>
    )
}

export { AlgoContextProvider, useAlgo }