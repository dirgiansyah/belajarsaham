import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Belajar Saham</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}
