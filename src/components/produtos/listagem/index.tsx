import { Layout } from "components/layout"
import Head from "next/head"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "app/models/produtos"
import useSWR from 'swr'
import { httpClient } from "app/http"
import { AxiosResponse } from "axios"
import { Loader } from "components/common/loader"
import Router from "next/router"
import { useProdutoService } from "app/services"
import { useEffect, useState } from "react"
import { Alert } from "components/common/message"



export const ListagemProdutos: React.FC = () => {

    const service = useProdutoService()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
    ('/api/produtos', url => httpClient.get(url))
    
    const [lista, setLista] = useState<Produto[]>([])
    
    useEffect(() => {
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url =`/cadastros/produtos?id=${produto.idProduto}`
        Router.push(url)
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.idProduto).then(Response => {
            setMessages([
                {tipo: "success", texto: "Produto Excluido com sucesso"}
            ])

            const listaAlterada: Produto[] = lista?.filter( p => p.idProduto != produto.idProduto)
            setLista(listaAlterada)
        })
    }


    return(
        <>
            <Head>
                <title>Produtos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout titulo="Produtos" mensagens={messages}>
                <Link href="/cadastros/produtos">
                    <button className="button is-link">Novo produto</button>
                </Link>
                <br /><br />
                <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista || []}/>
                <Loader mostrarLoader={!result}/>
            </Layout>
        </>
    )
}