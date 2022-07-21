import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITrack, TTrackId } from './track.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';
import { TArtistId } from 'src/artist/artist.model';
import { TAlbumId } from 'src/album/album.model';
import { FavoriteService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(private readonly favoriteService: FavoriteService) {}

  findAll(): ITrack[] {
    return database.tracks;
  }

  findOne(id: TTrackId): ITrack {
    const track = database.tracks.find((item: ITrack) => item.id === id);
    if (!track) {
      throw new HttpException('There is no such Track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  create(createTrack: CreateTrackDto): ITrack {
    const newTrack: ITrack = {
      id: uuid(),
      ...createTrack,
    };

    database.tracks.push(newTrack);

    return newTrack;
  }

  delete(id: TTrackId): string {
    const newTracksArr = database.tracks.filter((item: ITrack) => {
      return item.id !== id;
    });

    if (
      !database.tracks.length ||
      newTracksArr.length === database.tracks.length
    ) {
      throw new HttpException('There is no such Track', HttpStatus.NOT_FOUND);
    }

    database.tracks = newTracksArr;
    // this.favoriteService.deleteTrack(id);

    return `Track with id: ${id} was deleted!`;
  }

  clearArtist(id: TArtistId): string {
    const updatedTracksArr = database.tracks.map((item: ITrack) => {
      if (item.artistId === id) {
        return { ...item, artistId: null };
      }
      return item;
    });

    database.tracks = updatedTracksArr;

    return `Tracks that have included Artist with id: ${id} were updated`;
  }

  clearAlbum(id: TAlbumId): string {
    const updatedTracksArr = database.tracks.map((item: ITrack) => {
      if (item.albumId === id) {
        return { ...item, albumId: null };
      }
      return item;
    });

    database.tracks = updatedTracksArr;

    return `Tracks that have included Album with id: ${id} were updated`;
  }

  update(id: TTrackId, updateTrack: UpdateTrackDto): ITrack {
    const track = database.tracks.find((item: ITrack) => item.id === id);

    if (!track) {
      throw new HttpException('There is no such Track', HttpStatus.NOT_FOUND);
    }

    const { name, albumId, artistId, duration } = updateTrack;

    track.name = name || track.name;
    track.albumId = albumId || track.albumId;
    track.artistId = artistId || track.artistId;
    track.duration = duration || track.duration;

    return track;
  }
}
