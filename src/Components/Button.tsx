
interface Props{
    Text: string;
    Style: 'Outlined' | 'Filled';
    Type?: 'button' | 'submit';
    extraStyles?: React.CSSProperties;
    Disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>)=> void;
}

const Button = ({ Text, Type='button', extraStyles, Style, Disabled=false, onClick }: Props) => {
    return (
        <button style={extraStyles} type={Type} onClick={onClick} className={`btn ${Style} ${Disabled && 'dsp'}`} disabled={Disabled}>
            { Text }
        </button>
    )
}

export default Button;