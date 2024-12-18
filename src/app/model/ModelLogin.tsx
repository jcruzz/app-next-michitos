export interface IFormInput {
  username: string;
  password: string;
}

export interface IResponeLogin {
  id: number;
  username: string;
  email: string;
  roles: string[];
  tokenType: string;
  accessToken: string;
}
