interface MessageProps {
    tipo: 'success' | 'danger' | 'warning'
    field?: string
    texto: string
}

export interface Alert {
    tipo: 'success' | 'danger' | 'warning'
    field?: string
    texto: string
}

export const Message: React.FC<MessageProps> = ({ tipo, field, texto }) => {
    return (
        <article className={`message is-${tipo}`}>
            <div className="message-body">
                {field && `${field}: `}{texto}
            </div>
        </article>
    )
}