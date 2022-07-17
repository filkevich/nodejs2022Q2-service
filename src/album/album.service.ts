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

@Injectable()
export class AlbumService {
  findAll(): IAlbum[] {
    return database.albums;
  }

  findOne(id: TAlbumId): IAlbum {
    const album = database.albums.find((item: IAlbum) => item.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
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
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    database.albums = newAlbumsArr;

    return `Album with id: ${id} was deleted!`;
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
