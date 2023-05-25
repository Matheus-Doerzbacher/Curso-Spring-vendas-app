import { httpClient } from '../http'
import { Cliente } from 'app/models/clientes'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/clientes"

export const useClienteService = () => {

    const salvar = async (cliente: Cliente): Promise<Cliente> => {
        const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceURL, cliente)
        return response.data
    }

    const atualizar = async (cliente: Cliente): Promise<void> => {
        const url: string = `${resourceURL}/${cliente.idCliente}`
        await httpClient.put<Cliente>(url, cliente)
    }

    const carregarProduto = async (idCliente) : Promise<Cliente> => {
        const url: string = `${resourceURL}/${idCliente}`
        const response: AxiosResponse<Cliente> = await httpClient.get(url)
        return response.data
    }

    const deletar = async (idCliente): Promise<void> =>{
        const url: string = `${resourceURL}/${idCliente}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarProduto,
        deletar
    }

}