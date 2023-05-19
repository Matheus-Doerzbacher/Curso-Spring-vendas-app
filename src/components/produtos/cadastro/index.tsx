import { Produto } from 'app/models/produtos'
import { useProdutoService } from 'app/services'
import { converterEmBigDecimal } from 'app/util/money'
import { Input } from 'components/common/input'
import { Alert } from 'components/common/message'
import { Layout } from 'components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import * as yup from 'yup'

const msgCampoObrigatorio = "Campo Obrigatório" 

const validationSchema = yup.object().shape({
    // trim() tira os espaços em branco no texto
    codigo: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "O valor deve ser maior que 0,00"),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio)
})

interface FormErros{
    codigo?:string
    preco?:string
    nome?:string
    descricao?:string
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [codigo, setCodigo] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [idProduto, setIdProduto] = useState<string>()
    const [dataCadastro, setDataCadastro] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErros>({})

    const submit = () => {
        const produto: Produto = {
            codigo,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao,
            idProduto
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (idProduto) {
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: "success", texto: "Produto atualizado com sucesso!"
                        }])
                    })
            } else {
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setIdProduto(produtoResposta.idProduto)
                        setDataCadastro(produtoResposta.dataCadastro)
                        setMessages([{
                            tipo: "success", texto: "Produto salvo com sucesso!"
                        }])
                    })
            }
        }).catch(err => {
            const field = err.path
            const message = err.message

            setErrors({
                [field]: message
            })
        })


    }

    const renderizarId = () => {
        if (idProduto) {
            return (<>
                <div className="columns">
                    <div className="field column">
                        <Input
                            label='Id do Produto:'
                            id='inputId'
                            classname='input'
                            value={idProduto}
                            disable
                        />
                    </div>

                    <div className="field column">
                        <Input
                            label='Data de Cadastro:'
                            id='inputDataCadastro'
                            type='text'
                            classname='input'
                            value={dataCadastro}
                            disable
                        />
                    </div>
                </div>
            </>)
        } else { return false }
    }

    return (
        <>
            <Head>
                <title>Cadastro de Produto</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout titulo='Cadastro de Produtos' mensagens={messages}>
                {renderizarId()}
                <div className="columns">
                    <div className="field column">
                        <Input
                            label='Código: *'
                            id='inputCodigo'
                            classname='input'
                            placeholder='Digite o código do produto'
                            value={codigo}
                            onChange={setCodigo}
                            error={errors.codigo}
                        />
                    </div>

                    <div className="field column ">
                        <Input
                            label='Preço: *'
                            id='inputPreco'
                            classname='input'
                            placeholder='Digite o preço do produto'
                            value={preco}
                            onChange={setPreco}
                            currency
                            maxLength={16}
                            error={errors.preco}
                        />
                    </div>
                </div>

                <div className="columns">
                    <div className="field column is-full">
                        <Input
                            label='Nome: *'
                            id='inputNome'
                            type='text'
                            classname='input'
                            placeholder='Digite o nome do produto'
                            value={nome}
                            onChange={setNome}
                            error={errors.nome}
                        />
                    </div>
                </div>

                <div className="columns">
                    <div className="field column is-full">
                        <Input
                            istextarea
                            label='Descrição: *'
                            id='inputDescricao'
                            type='text'
                            classname='textarea'
                            placeholder='Digite a descrição detalhada do produto'
                            value={descricao}
                            onChange={setDescricao}
                            error={errors.descricao}
                        />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={submit}>
                            {idProduto ? 'Atulaizar' : 'Salvar'}
                        </button>
                    </div>
                    <div className="control">
                        <Link href="/consultas/produtos">
                            <button className="button is-link is-light">Voltar</button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    )
}