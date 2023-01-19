export interface IShopItem {
  id: number;
  completed: boolean;
  title: string;
}

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
}

export interface IAvatarServerResponse {
  url: string;
  text: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IUserLoginResponse {
  _id: string;
  name: string;
  avatar: string;
  token: string;
}

export interface IUserNewPassword {
  _id: string;
  name: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
}
