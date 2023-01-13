export interface IShopItem {
    id: number
    completed: boolean
    title: string
}

export interface IUser {
    id: number
    name: string
    password: string
    avatar: string
}

export interface IAvatarServerResponse {
    url: string;
    text: string;
  }