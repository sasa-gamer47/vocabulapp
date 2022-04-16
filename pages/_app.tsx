import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
  
}

export default MyApp
