export interface IIconProps{
    Size?: number;
    Color?: 'white' | 'black';
    butonStyles?: React.CSSProperties;
    onClick: (event: React.MouseEvent<HTMLElement>)=> void;
}