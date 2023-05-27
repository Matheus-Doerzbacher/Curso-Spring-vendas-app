import { Cliente } from "app/models/clientes"
import { Input } from "components/common/input"
import { Layout } from "components/layout"
import { useFormik } from "formik"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';

interface ConsultaClientesForm {
    nome?: string
    cpf?: string
}

export const ListagemClientes: React.FC = () => {

    const [clientes, setClientes] = useState<Cliente[]>([
        { idCliente: "15", nome: "Matheus", cpf: "715.054.471-19", email: "Matheus@teste.com" }
    ])

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        console.log(filtro)
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', cpf: '' }
    })

    return (
        <>
            <Head>
                <title>Clientes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout titulo="Clientes">
                <form onSubmit={formikSubmit}>
                    <div className="columns">
                        <Input label="Nome:" id="nome" name="nome" value={filtro.nome} columnClasses="is-half" autoComplete="off" onChange={handleChange} />
                        <Input label="Cpf:" id="cpf" name="cpf" value={filtro.cpf} columnClasses="is-half" onChange={handleChange} />
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-success" type="submit" style={{ marginRight: "20px" }}>
                                Consultar
                            </button>
                            <Link href="/cadastros/clientes">
                                <button className="button is-link">Novo CLiente</button>
                            </Link>
                        </div>
                    </div>
                </form>
                <div className="is-full" style={{marginTop: "15px"}}>
                    <DataTable value={clientes}>
                        <Column field="idCliente" header="Código" />
                        <Column field="nome" header="Nome" />
                        <Column field="cpf" header="CPF" />
                        <Column field="email" header="Email" />
                    </DataTable>
                </div>
            </Layout>
        </>
    )
}