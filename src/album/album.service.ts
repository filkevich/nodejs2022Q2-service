import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAlbum, TAlbumId } from './album.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateAlbumDto from './dtos/createAlbum.dto';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import { TArtistId } from 'src/artist/artist.model';
import { TrackService } from 'src/track/track.service';
import { FavoriteService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoriteService: FavoriteService,
  ) {}

  findAll(): IAlbum[] {
    return database.albums;
  }

  findOne(id: TAlbumId): IAlbum {
    const album = database.albums.find((item: IAlbum) => item.id === id);
    if (!album) {
      throw new HttpException('There is no such Album', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  create(createAlbum: CreateAlbumDto): IAlbum {
    const newAlbum: IAlbum = {
      id: uuid(),
      ...createAlbum,
    };

    database.albums.push(newAlbum);

    return newAlbum;
  }

  delete(id: TAlbumId): string {
    const newAlbumsArr = database.albums.filter((item: IAlbum) => {
      return item.id !== id;
    });

    if (
      !database.albums.length ||
      newAlbumsArr.length === database.albums.length
    ) {
      throw new HttpException('There is no such Album', HttpStatus.NOT_FOUND);
    }

    database.albums = newAlbumsArr;
    this.trackService.clearAlbum(id);
    // this.favoriteService.deleteAlbum(id);

    return `Album with id: ${id} was deleted!`;
  }

  clearArtist(id: TArtistId): string {
    const updatedAlbumsArr = database.albums.map((item: IAlbum) => {
      if (item.artistId === id) {
        return { ...item, artistId: null };
      }
      return item;
    });

    database.albums = updatedAlbumsArr;

    return `Albums that have included Artist with id: ${id} were updated`;
  }

  update(id: TAlbumId, updateAlbum: UpdateAlbumDto): IAlbum {
    const album = database.albums.find((item: IAlbum) => item.id === id);

    if (!album) {
      throw new HttpException('There is no such Album', HttpStatus.NOT_FOUND);
    }

    for (const key in updateAlbum) {
      album[key] = updateAlbum[key];
    }

    return album;
  }
}
