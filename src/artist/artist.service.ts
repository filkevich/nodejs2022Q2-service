import { Injectable, NotFoundException } from '@nestjs/common';
import { IArtist, TArtistId } from './artist.model';
import database from 'src/db/db.service';
import { v4 as uuid } from 'uuid';
import CreateArtistDto from './dtos/createArtist.dto';
import UpdateArtistDto from './dtos/updateArtist.dto';

@Injectable()
export class ArtistService {
  findAll(): IArtist[] {
    return database.artists;
  }

  findOne(id: TArtistId): IArtist {
    const artist = database.artists.find((item: IArtist) => item.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
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
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }

    database.artists = newArtistsArr;

    return `Artist with id: ${id} was deleted!`;
  }

  update(id: TArtistId, updateArtist: UpdateArtistDto): IArtist {
    const artist = database.artists.find((item: IArtist) => item.id === id);

    const { name, grammy } = updateArtist;

    artist.name = name || artist.name;
    artist.grammy = grammy || artist.grammy;

    return artist;
  }
}
