import { Produto } from "app/models/produtos"
import { useState } from "react"

interface TabelaProdutosProps {
    produtos: Array<Produto>
    onEdit: (produto) => void
    onDelete: (produto) => void
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onEdit, onDelete }) => {
    return (
        <table className="table is-striped is-hoverable">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => (
                        <ProdutoRow onEdit={onEdit}
                            onDelete={onDelete}
                            key={produto.idProduto}
                            produto={produto}
                        />)
                    )
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto
    onEdit: (produto) => void
    onDelete: (produto) => void
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto, onEdit, onDelete }) => {

    const [deletenado, setDeletando] = useState<boolean>(false)

    const onDeleteClick = (produto: Produto) => {
        if (deletenado) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)

    return (
        <tr>
            <td>{produto.idProduto}</td>
            <td>{produto.codigo}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                {!deletenado &&
                    <button className="button is-success is-rounded is-small"
                        onClick={e => onEdit(produto)}
                        style={{ marginRight: '15px', width:'70px'}}>
                        Editar
                    </button>
                }
                <button className="button is-danger is-rounded is-small"
                    onClick={e => onDeleteClick(produto)}
                    style={{width:'70px'}}>
                    {deletenado ? "Confirmar" : "Deletar"}
                </button>
                {deletenado &&
                    <button className="button is-rounded is-small"
                        onClick={cancelaDelete}
                        style={{ marginLeft: '15px', width:'70px'}}>
                        Cancelar
                    </button>
                }
            </td>
        </tr>
    )
}