import { Layout } from "components/layout"
import { ClienteForm } from "./form"
import { useState } from 'react'
import { Cliente } from "app/models/clientes"
import { useClienteService } from "app/services/cliente.service"
import { Alert } from "components/common/message"
import Head from "next/head"

export const CadastroCliente: React.FC = () => {

    const [cliente, setCLiente] = useState<Cliente>({})
    const [messages, setMessages] = useState<Array<Alert>>([])
    const service = useClienteService()

    const handleSubmit = (cliente: Cliente) => {
        if (cliente.idCliente) {
            service.atualizar(cliente).then(response => {
                setMessages([{
                    tipo: "success", texto: "Cliente atualizado com sucesso!"
                }])
            })
        } else {
            service.salvar(cliente).then(clienteSalvo => {
                setCLiente(clienteSalvo)
                setMessages([{
                    tipo: "success", texto: "Produto salvo com sucesso!"
                }])
            })
        }
    }
    return (
        <>
            <Head>
                <title>Cadastro de Clientes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout titulo="Cadastro de Clientes" mensagens={messages}>
                <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
            </Layout>
        </>
    )
}