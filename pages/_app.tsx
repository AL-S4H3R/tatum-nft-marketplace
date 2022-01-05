import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AlgoContextProvider } from '../src/context/WalletContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AlgoContextProvider>
        <Component {...pageProps} />
      </AlgoContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
