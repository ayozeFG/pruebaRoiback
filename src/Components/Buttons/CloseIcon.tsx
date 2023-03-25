import { IIconProps } from "../../Interfaces/iconProps";

const CloseIcon = ({Size=12, Color="black", butonStyles=undefined, onClick}:IIconProps) => {
    return (
        <button style={butonStyles} onClick={onClick}>
            <svg style={{width: Size, height: Size}} xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1={Size}
                    x2={Size} y2="1"
                    stroke={Color}
                    strokeWidth="2"/>
                <line x1="1" y1="1"
                    x2={Size} y2={Size}
                    stroke={Color}
                    strokeWidth="2"/>
            </svg>
        </button>
    )
}

export default CloseIcon;