import { createContext, useState } from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'

interface IWalletInstance {
    accounts: string[]
}

const AlgoContext = createContext(null)

const AlgoContextProvider = async () => {
    
    const [accounts, setAccounts] = useState<string[]>([])
    
    const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal
    })

    return(
        <AlgoContext.Provider value={null}>
        </AlgoContext.Provider>
    )
}

export { AlgoContextProvider }