export type TId = string;

export interface IUser {
  id: TId;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
