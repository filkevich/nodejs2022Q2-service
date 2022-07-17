import { IUser } from 'src/user/user.model';
import { IArtist } from 'src/artist/artist.model';
import { ITrack } from 'src/tracks/track.model';

export default interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
}
