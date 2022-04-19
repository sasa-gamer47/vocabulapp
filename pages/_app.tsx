import React from 'react'
import { CookiesProvider } from "react-cookie"
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
  
}

// class App extends App<AppInterface, AppProps> {
//     static async getInitialProps(props) {
//         let referringURL;
//         let requestingURL;
//         const { ctx } = props;
//         if (ctx.isServer) {
//             referringURL = ctx.req.headers.referer;
//             requestingURL = ctx.req.reqPath;
//         } 
//         // you can dispatch them to store
//         // ctx.store.dispatch()
//         return { 
//             referringURL,
//             requestingURL
//         }
//     }
//     render() {
//         const { Component, pageProps } = this.props;
//         // pageProps is nothing but your object returned from the 
//         // getInitialProps()
//         return (
//             <Provider store={store}>
//               <CookiesProvider>
//                 <Component {...pageProps} />
//               </CookiesProvider>
//             </Provider>
//         );
//     }
// }

export default App
