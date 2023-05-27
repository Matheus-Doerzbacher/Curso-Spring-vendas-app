import { Cliente } from "app/models/clientes"
import { Input, InputCPF, InputDate, InputPhone } from "components/common/input"
import { useFormik } from "formik"
import { validationScheme } from "./validationSchema"
import Link from "next/link"

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
        enableReinitialize: true,
        validationSchema: validationScheme
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
                        error={formik.errors.nome} 
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
                        error={formik.errors.cpf} 
                />
                <InputDate  id="nascimento" 
                        name="nascimento"
                        label="Data de Nascimento *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.nascimento}
                        error={formik.errors.nascimento}  
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
                        error={formik.errors.endereco}  
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
                        error={formik.errors.email} 
                />
                <InputPhone  id="telefone" 
                        name="telefone"
                        label="Telefone *"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={formik.handleChange} 
                        value={formik.values.telefone}
                        error={formik.errors.telefone} 
                />
            </div>
            <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">
                            {formik.values.idCliente ? 'Atulaizar' : 'Salvar'}
                        </button>
                    </div>
                    <div className="control">
                        <Link href="/consultas/clientes">
                            <button className="button is-link is-light">Voltar</button>
                        </Link>
                    </div>
                </div>
        </form>
    )
}