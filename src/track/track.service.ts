import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITrack, TTrackId } from './track.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';

@Injectable()
export class TrackService {
  findAll(): ITrack[] {
    return database.tracks;
  }

  findOne(id: TTrackId): ITrack {
    const track = database.tracks.find((item: ITrack) => item.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
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
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    database.tracks = newTracksArr;

    return `Track with id: ${id} was deleted!`;
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
