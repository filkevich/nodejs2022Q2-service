import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IArtist, TArtistId } from './artist.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateArtistDto from './dtos/createArtist.dto';
import UpdateArtistDto from './dtos/updateArtist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { FavoriteService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  findAll(): IArtist[] {
    return database.artists;
  }

  findOne(id: TArtistId): IArtist {
    const artist = database.artists.find((item: IArtist) => item.id === id);
    if (!artist) {
      throw new HttpException('There is no such Artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): IArtist {
    const newArtist: IArtist = {
      id: uuid(),
      ...createArtistDto,
    };

    database.artists.push(newArtist);

    return newArtist;
  }

  delete(id: TArtistId): string {
    const newArtistsArr = database.artists.filter((item: IArtist) => {
      return item.id !== id;
    });

    if (
      !database.artists.length ||
      newArtistsArr.length === database.artists.length
    ) {
      throw new HttpException('There is no such Artist', HttpStatus.NOT_FOUND);
    }

    database.artists = newArtistsArr;
    this.trackService.clearArtist(id);
    this.albumService.clearArtist(id);
    // this.favoriteService.deleteArtist(id);

    return `Artist with id: ${id} was deleted!`;
  }

  update(id: TArtistId, updateArtist: UpdateArtistDto): IArtist {
    const artist = database.artists.find((item: IArtist) => item.id === id);

    if (!artist) {
      throw new HttpException('There is no such Artist', HttpStatus.NOT_FOUND);
    }

    const { name, grammy } = updateArtist;

    artist.name = name || artist.name;
    artist.grammy = grammy || artist.grammy;

    return artist;
  }
}
