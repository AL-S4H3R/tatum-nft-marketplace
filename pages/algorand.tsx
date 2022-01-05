import type { NextPage } from 'next'
import { useAlgorand } from '../src/hooks/useAlgorand'

const Algorand: NextPage = () => {
    
    const { accounts, connect, error } = useAlgorand()

    if(error){
        return(
            <div className='fixed top-0 bg-red-800 text-white'>
                <p>{JSON.stringify(error)}</p>
            </div>
        )
    }

    return(
        <div className='layout'>
            <nav className='nav'>
                <h1>nftAP</h1>
                <div>
                    <ul className='flex space-x-12'>
                        <li className='navlink'>Markets</li>
                        <li className='navlink'>Discord</li>
                        <li className='navlink'>FAQ's</li>
                    </ul>
                </div>
                <button className='btn' onClick={connect}>
                    Login
                </button>
            </nav>
            {
                accounts && <p>{accounts[0]}</p>
            }
        </div>
    )
}

export default Algorand