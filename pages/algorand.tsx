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

    return(
        <>
            <button>Algorand</button>
        </>
    )
}

export default Algorand