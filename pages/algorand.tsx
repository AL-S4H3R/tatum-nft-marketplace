import { Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const Algorand: NextPage = () => {
    // @ts-ignore
    const AlgoSigner = globalThis.AlgoSigner
    
    useEffect(() => {
        if(typeof AlgoSigner !== 'undefined'){
            console.log('Algorand works')
        }
    }, [])

    const fetchAccounts = async () => {
        await AlgoSigner.connect({
            ledger: 'TestNet'
        })
        const accounts = await AlgoSigner.accounts({
            ledger: 'TestNet'
        })
        console.log(accounts)
    }

    return(
        <>
            <Button onClick={fetchAccounts}>Algorand</Button>
        </>
    )
}

export default Algorand