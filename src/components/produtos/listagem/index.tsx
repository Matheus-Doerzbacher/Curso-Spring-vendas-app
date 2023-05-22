import { Layout } from "components/layout"
import Head from "next/head"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "app/models/produtos"
import useSWR from 'swr'
import { httpClient } from "app/http"
import { AxiosResponse } from "axios"
import { Loader } from "components/common/loader"



export const ListagemProdutos: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
                    ('/api/produtos', url => httpClient.get(url))

    const editar = (produto: Produto) => {
        console.log(produto)
    }

    const deletar = (produto: Produto) => {
        console.log(produto)
    }


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
                <br /><br />
                <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={result?.data || []}/>
                <Loader mostrarLoader={!result}/>
            </Layout>
        </>
    )
}