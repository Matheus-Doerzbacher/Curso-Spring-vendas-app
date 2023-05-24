import { Cliente } from "app/models/clientes"
import { Input, InputCPF, InputDate, InputPhone } from "components/common/input"
import { useFormik } from "formik"

interface CLienteFormProps {
    cliente: Cliente
    onSubmit: (cliente: Cliente) => void
}

const formScheme: Cliente = {
    idCliente:'',
    nome:'',
    cpf:'',
    nascimento:'',
    endereco:'',
    telefone:'',
    email:'',
    dataCadastro:''
}

export const ClienteForm: React.FC<CLienteFormProps> = ({cliente, onSubmit}) => {

    const formik = useFormik<Cliente>({
        initialValues: { ... formScheme, ...cliente},
        onSubmit,
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.idCliente &&
                <div className="columns">
                    <Input  id="idCliente" 
                            name="idCliente"
                            label="Código Cliente"
                            columnClasses="is-half"
                            autoComplete="off"
                            value={formik.values.idCliente}
                            disabled
                    />
                    <Input  id="dataCadastro" 
                            name="dataCadastro"
                            label="Data de cadastro"
                            columnClasses="is-half"
                            autoComplete="off"
                            value={formik.values.dataCadastro}
                            disabled
                    />
                </div>
            }


            <div className="columns">
                <Input  id="nome" 
                        name="nome"
                        label="Nome *"
                        columnClasses="is-full"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik.values.nome} 
                />
            </div>


            <div className="columns">
                <InputCPF  id="cpf" 
                        name="cpf"
                        label="CPF *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.cpf} 
                />
                <InputDate  id="nascimento" 
                        name="nascimento"
                        label="Data de Nascimento *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.nascimento} 
                />
            </div>


            <div className="columns">
                <Input  id="endereco" 
                        name="endereco"
                        label="Endereço *"
                        columnClasses="is-full"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.endereco} 
                />
            </div>


            <div className="columns">
                <Input  id="email" 
                        name="email"
                        label="E-mail *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                />
                <InputPhone  id="telefone" 
                        name="telefone"
                        label="Telefone *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.telefone} 
                />
            </div>
            <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">
                            {formik.values.idCliente ? 'Atulaizar' : 'Salvar'}
                        </button>
                    </div>
                    {/* <div className="control">
                        <Link href="/consultas/produtos">
                            <button className="button is-link is-light">Voltar</button>
                        </Link>
                    </div> */}
                </div>
        </form>
    )
}