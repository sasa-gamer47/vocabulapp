import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { middleware } from './_middleware'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="referrer" content="origin" />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' href='/icon-192x192.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument