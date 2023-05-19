import { Layout } from "components/layout"
import Head from "next/head"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "app/models/produtos"


export const ListagemProdutos: React.FC = () => {

    const produtos: Produto[] = [
        { idProduto:'1', codigo: 'HGT150', nome: 'TESTE', preco: 250.00 },
        { idProduto:'1', codigo: 'HGT150', nome: 'TESTE', preco: 250.00 },
        { idProduto:'1', codigo: 'HGT150', nome: 'TESTE', preco: 250.00 },
        { idProduto:'1', codigo: 'HGT150', nome: 'TESTE', preco: 250.00 }
    ]

    return(
        <>
            <Head>
                <title>Produtos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout titulo="Produtos">
                <Link href="/cadastros/produtos">
                    <button className="button is-link">Novo produto</button>
                </Link>
                <br />
                <TabelaProdutos produtos={produtos}/>
            </Layout>
        </>
    )
}