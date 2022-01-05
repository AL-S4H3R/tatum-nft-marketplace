import { useContext } from 'react'
import { AlgoContext } from '../context/WalletContext'

const useAlgorand = () => {
    return(useContext(AlgoContext))
}

export { useAlgorand }