import { Produto } from 'app/models/produtos'
import { useProdutoService } from 'app/services'
import { converterEmBigDecimal, formatReal } from 'app/util/money'
import { Input, InputMoney } from 'components/common/input'
import { Alert } from 'components/common/message'
import { Layout } from 'components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as yup from 'Yup'

const msgCampoObrigatorio = "Campo Obrigatório"

const validationSchema = yup.object().shape({
    // trim() tira os espaços em branco no texto
    codigo: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "O valor deve ser maior que 0,00"),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio)
})

interface FormErros {
    codigo?: string
    preco?: string
    nome?: string
    descricao?: string
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

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id){    
            service.carregarProduto(id).then(produtoEncontrado => {
                console.log(produtoEncontrado)
                setIdProduto(produtoEncontrado.idProduto)
                setCodigo(produtoEncontrado.codigo ?? '')
                setNome(produtoEncontrado.nome ?? '')
                setDescricao(produtoEncontrado.descricao ?? '')
                setPreco(formatReal(`${produtoEncontrado.preco}`) ?? '')
                setDataCadastro(produtoEncontrado.dataCadastro ?? '')
            })
        }
    }, [id])

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
        }).catch((err) => {
            const field = err.path
            const message = err.message

            console.log(err.path)
            console.log(err)

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
                            value={idProduto}
                            disabled
                        />
                    </div>

                    <div className="field column">
                        <Input
                            label='Data de Cadastro:'
                            id='inputDataCadastro'
                            type='text'
                            value={dataCadastro}
                            disabled
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
                    <div className="field column is-half">
                        <Input
                            label='Código: *'
                            id='inputCodigo'
                            placeholder='Digite o código do produto'
                            value={codigo}
                            onChange={e => setCodigo(e.target.value)}
                            error={errors.codigo}
                        />
                    </div>

                    <div className="field column is-half">
                        <InputMoney
                            label='Preço: *'
                            id='inputPreco'
                            placeholder='Digite o preço do produto'
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
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
                            placeholder='Digite o nome do produto'
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            error={errors.nome}
                        />
                    </div>
                </div>

                <div className="columns">
                    <div className="field column is-full">
                        <label className='label' htmlFor='inputDescricao'>Descrição: *</label>
                        <textarea
                            id='inputDescricao'
                            className='textarea'
                            placeholder='Digite a descrição detalhada do produto'
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        ></textarea>
                        {errors.descricao && 
                            <p className='help is-danger'>{errors.descricao}</p>
                        }
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