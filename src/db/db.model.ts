import { IUser } from 'src/user/user.model';

export default interface IDatabase {
  users: IUser[];
}
