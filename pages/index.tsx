import type { NextPage } from 'next'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useState } from 'react'


const Home: NextPage = () => {
	
	const [userAccounts, setUserAccounts] = useState<Array<string>>([])
	
	const connectToMetamask = async () => {
		// @ts-ignore
		const ethereumObject = window.ethereum
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
			<Button onClick={connectToMetamask}>Connect to Metamask</Button>
		</Box>
	)
}

export default Home