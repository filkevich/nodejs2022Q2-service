import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.tracks.push(id);
    return track;
  }

  addArtist(id: TArtistId) {
    const artist = database.artists.find((item: IArtist) => item.id === id);
    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.artists.push(id);
    return artist;
  }

  addAlbum(id: TAlbumId) {
    const album = database.albums.find((item: IAlbum) => item.id === id);
    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.albums.push(id);
    return album;
  }

  deleteTrack(id: TTrackId) {
    const trackIndex = database.favorites.tracks.findIndex(
      (track) => track === id,
    );

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.tracks = [
      ...database.favorites.tracks.slice(0, trackIndex),
      ...database.favorites.tracks.slice(trackIndex + 1),
    ];

    return `Track with id: ${id} was deleted from favorites`;
  }

  deleteArtist(id: TArtistId) {
    const artistIndex = database.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (artistIndex === -1) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.artists = [
      ...database.favorites.artists.slice(0, artistIndex),
      ...database.favorites.artists.slice(artistIndex + 1),
    ];

    return `Artist with id: ${id} was deleted from favorites`;
  }

  deleteAlbum(id: TAlbumId) {
    const albumIndex = database.favorites.albums.findIndex(
      (album) => album === id,
    );

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    database.favorites.albums = [
      ...database.favorites.albums.slice(0, albumIndex),
      ...database.favorites.albums.slice(albumIndex + 1),
    ];

    return `Artist with id: ${id} was deleted from favorites`;
  }
}
