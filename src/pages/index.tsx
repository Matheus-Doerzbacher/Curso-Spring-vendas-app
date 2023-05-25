import { Layout } from 'components/layout'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo='Página principal'/>
    </div>
  )
}
