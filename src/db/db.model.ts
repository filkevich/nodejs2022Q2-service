import { IUser } from 'src/user/user.model';
import { IArtist, TArtistId } from 'src/artist/artist.model';
import { ITrack, TTrackId } from 'src/track/track.model';
import { IAlbum, TAlbumId } from 'src/album/album.model';

export default interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: {
    tracks: TTrackId[];
    artists: TArtistId[];
    albums: TAlbumId[];
  };
}
