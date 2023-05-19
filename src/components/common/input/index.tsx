import { formatReal } from '../../../app/util/money'

interface InputProps{
    onChange?: (value: any) => void
    label: string
    value: any
    id?: string
    type?: string 
    classname?: string
    placeholder?: string
    disable?: boolean
    currency?: boolean
    maxLength?: number
    error?: string
    istextarea?: boolean
}

export const Input: React.FC<InputProps> = ({
    onChange, label, value, id, type, classname, placeholder, disable, 
            currency, maxLength, error, istextarea
}: InputProps) => {

    const onInputChange = e => {
        let valor = e.target.value;

        if (valor && currency){
            valor = formatReal(valor)
        }
        onChange?.(valor)
    }
    return (
        <>
            <label className='label' htmlFor={id}>
                {label}
            </label>
            <div className="control">
            { istextarea ? (
                <textarea
                    id={id}
                    className={classname ?? 'input'}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onInputChange(e)}
                    disabled={disable}
                    maxLength={maxLength}></textarea>
            ) : (
                <input
                    id={id}
                    type={type}
                    className={classname ?? 'input'}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onInputChange(e)}
                    disabled={disable}
                    maxLength={maxLength}
                />
            )}
            {error && 
                <p className='help is-danger'>{error}</p>
            }
            </div>
        </>
    )
}