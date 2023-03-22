
interface Props{
    Text: string;
    Type: 'Outlined' | 'Filled';
    butonStyles?: React.CSSProperties;
    onClick: (event: React.MouseEvent<HTMLElement>)=> void;
}

const Button = ({Text, Type, butonStyles, onClick}: Props) => {
    return (
        <button style={butonStyles} onClick={onClick} className={`btn ${Type}`}>
            { Text }
        </button>
    )
}

export default Button;