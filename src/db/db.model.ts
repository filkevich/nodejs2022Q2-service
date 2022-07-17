import { IUser } from 'src/user/user.model';
import { IArtist } from 'src/artist/artist.model';

export default interface IDatabase {
  users: IUser[];
  artists: IArtist[];
}
