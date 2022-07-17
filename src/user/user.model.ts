export type TUserId = string;

export interface IUser {
  id: TUserId;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
