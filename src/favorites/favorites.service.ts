import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAlbum, TAlbumId } from 'src/album/album.model';
import { IArtist, TArtistId } from 'src/artist/artist.model';
import { ITrack, TTrackId } from 'src/track/track.model';
import database from 'src/db/db.service';

import { IFavorites } from './favorites.model';

@Injectable()
export class FavoriteService {
  findAll(): IFavorites {
    const tracks = database.favorites.tracks.map((item: TTrackId) => {
      const track = database.tracks.find((track: ITrack) => track.id === item);
      if (!track) {
        return null;
      }
      return track;
    });

    const albums = database.favorites.albums.map((item: TAlbumId) => {
      const album = database.albums.find((album: IAlbum) => album.id === item);
      if (!album) {
        return null;
      }
      return album;
    });

    const artists = database.favorites.artists.map((item: TArtistId) => {
      const artist = database.artists.find(
        (artist: IArtist) => artist.id === item,
      );
      if (!artist) {
        return null;
      }
      return artist;
    });

    return {
      artists: artists,
      tracks: tracks,
      albums: albums,
    };
  }

  addTrack(id: TTrackId) {
    const track = database.tracks.find((item: ITrack) => item.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    database.favorites.tracks.push(id);
    return track;
  }

  addArtist(id: TArtistId) {
    const artist = database.artists.find((item: IArtist) => item.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    database.favorites.artists.push(id);
    return artist;
  }

  addAlbum(id: TAlbumId) {
    const album = database.albums.find((item: IAlbum) => item.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    database.favorites.albums.push(id);
    return album;
  }

  deleteTrack(id: TTrackId) {
    const track = database.tracks.find((item: ITrack) => item.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    database.favorites.tracks = database.favorites.tracks.filter(
      (item) => item !== track.id,
    );

    return `Track with id: ${id} was deleted from favorites`;
  }

  deleteArtist(id: TArtistId) {
    const artist = database.artists.find((item: IArtist) => item.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    database.favorites.artists = database.favorites.artists.filter(
      (item) => item !== artist.id,
    );

    return `Artist with id: ${id} was deleted from favorites`;
  }

  deleteAlbum(id: TAlbumId) {
    const album = database.albums.find((item: IAlbum) => item.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    database.favorites.albums = database.favorites.albums.filter(
      (item) => item !== album.id,
    );

    return `Album with id: ${id} was deleted from favorites`;
  }
}
