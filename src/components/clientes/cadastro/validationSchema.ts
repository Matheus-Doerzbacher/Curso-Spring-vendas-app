import * as Yup from 'Yup'

const campoObrigatorioMensagem = "Campo Obrigatório"
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatorioMensagem)

export const validationScheme = Yup.object().shape({
    cpf: campoObrigatorioValidation.length(14, "CPF Inválido"),
    nascimento: campoObrigatorioValidation.length(10, "Data Inválida"),
    email: campoObrigatorioValidation.email("Email Inválido"),
    endereco: campoObrigatorioValidation,
    nome: campoObrigatorioValidation,
    telefone: campoObrigatorioValidation
})