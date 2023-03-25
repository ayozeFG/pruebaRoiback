import { IIconProps } from "../../Interfaces/iconProps";

const GoBackIcon = ({Size=24, Color="black", butonStyles=undefined, onClick}:IIconProps) => {
    return (
        <button style={butonStyles} onClick={onClick}>
            <svg style={{color: Color, ...butonStyles}} xmlns="http://www.w3.org/2000/svg" width={Size} height={Size} viewBox="0 0 512 512">
               <polyline
                    points="328 112 184 256 328 400"
                    style={{fill:"none", stroke:"#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48px"}}>
                </polyline>
            </svg>
        </button>
    )
}

export default GoBackIcon;