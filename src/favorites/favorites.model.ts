import { IArtist, TArtistId } from 'src/artist/artist.model';
import { IAlbum, TAlbumId } from 'src/album/album.model';
import { ITrack, TTrackId } from 'src/track/track.model';

export interface IFavoriteIds {
  artists: TArtistId[];
  albums: TAlbumId[];
  tracks: TTrackId[];
}

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
