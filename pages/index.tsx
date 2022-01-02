import type { NextPage } from 'next'
import { Box, Text, HStack, VStack, Heading } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

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

	// chain change event
	useEffect(() => {
		ethereumObject.on('chainChanged', (chainId: string) => {
			console.log(chainId)
		})
	}, [])

	// disconnect event
	useEffect(() => {
		ethereumObject.on('disconnect', () => {
			console.log('Wallet Disconnected')
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

	const deployNft = async () => {
		const response = await axios.post('https://api-eu1.tatum.io/v3/nft/deploy/', {
  							"name": "Test Token",
							"chain": "MATIC",
							"symbol": "TTC",
							"signatureId": uuidv4()
							}, {
							headers: {
								'x-api-key': process.env.NEXT_PUBLIC_API_KEY!
							}
						});
		const { signatureId } = response.data
		const {
			data
		} = await axios.get('https://api-eu1.tatum.io/v3/kms/' + signatureId, {
			headers: {
			  'x-api-key': process.env.NEXT_PUBLIC_API_KEY!
			}
		});
		const txConfig = JSON.parse(data.serializedTransaction);
		txConfig.from = userAccounts[0]
		txConfig.gasPrice = txConfig.gasPrice ? parseInt(txConfig.gasPrice).toString(16) : undefined	
	
		// sign the tx on metamask
		const tx = await ethereumObject.request({
			method: 'eth_sendTransaction',
			params: [txConfig]
		})
		console.log(tx)
	}
	return(
		<Box>
			<HStack p={8} align={'center'} justify={'space-between'}>
				<Heading>vybe</Heading>
				{
					userAccounts[0] ?
					<Text>
						{userAccounts[0].substring(0,5)}...{userAccounts[0].substring(37)}
					</Text> :
					<Button onClick={connectToMetamask}>
						Connect to Metamask
					</Button>
				}
			</HStack>
			<Button onClick={deployNft}>Deploy NFT</Button>
		</Box>
	)
}

export default Home