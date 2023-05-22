interface LoaderProps {
    mostrarLoader: boolean;
}

export const Loader: React.FC<LoaderProps> = ({mostrarLoader}) => {

    if (!mostrarLoader){
        return <></>
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: "center"
        }}>
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
    )
}