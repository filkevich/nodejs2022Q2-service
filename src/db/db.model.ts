import { IUser } from 'src/user/user.model';
import { IArtist } from 'src/artist/artist.model';
import { ITrack } from 'src/track/track.model';
import { IAlbum } from 'src/album/album.model';

export default interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
}
