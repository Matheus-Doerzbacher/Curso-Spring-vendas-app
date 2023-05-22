import { Produto } from "app/models/produtos"

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
                    produtos.map( produto => (
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
    return (
        <tr>
            <td>{produto.idProduto}</td>
            <td>{produto.codigo}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <button className="button is-success is-rounded is-small" 
                        onClick={e => onEdit(produto)}
                        style={{ marginRight: '15px' }}>
                    Editar
                </button>
                <button className="button is-danger is-rounded is-small"
                        onClick={e => onDelete(produto)}>
                    Deletar
                </button>
            </td>
        </tr>
    )
}