import { httpClient } from '../http'
import { Produto } from '../models/produtos'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto)
        return response.data
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        const url: string = `${resourceURL}/${produto.idProduto}`
        await httpClient.put<Produto>(url, produto)
    }

    const carregarProduto = async (idProduto) : Promise<Produto> => {
        const url: string = `${resourceURL}/${idProduto}`
        const response: AxiosResponse<Produto> = await httpClient.get(url)
        return response.data
    }

    const deletar = async (idProduto): Promise<void> =>{
        const url: string = `${resourceURL}/${idProduto}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarProduto,
        deletar
    }

}