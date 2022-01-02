import type { NextPage } from 'next'
import { Box, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useEffect, useState } from 'react'


const Home: NextPage = () => {
	
	const [userAccounts, setUserAccounts] = useState<Array<string>>([])
	
	// @ts-ignore
	const ethereumObject = globalThis.ethereum
	
	// check whether user has wallet connected & persist state
	useEffect(() => {
		if(ethereumObject.isConnected){
			connectToMetamask()
			console.log('Wallet connected')
		}
	}, [])

	useEffect(() => {
		ethereumObject.on('chainChanged', (chainId: string) => {
			console.log(chainId)
		})
	}, [])

	const connectToMetamask = async () => {
		if(typeof ethereumObject !== 'undefined'){
			const accounts: string[] = await ethereumObject.request({
				method: 'eth_requestAccounts'
			})
			setUserAccounts(accounts) 
		}
		else {
			alert('Please install metamask to continue')
		}
	}

	return(
		<Box>
			{
				userAccounts[0] ?
				<Text>
					{userAccounts[0].substring(0,5)}...{userAccounts[0].substring(37)}
				</Text> :
				<Button onClick={connectToMetamask}>
					Connect to Metamask
				</Button>
			}
		</Box>
	)
}

export default Home