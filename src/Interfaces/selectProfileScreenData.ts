export interface IinitalScreenData {
    Title: string
    subTitle: string
    Registered: string
    Profiles: IProfile[]
}
type IProfile = {
    ID: string
    Description: string
}