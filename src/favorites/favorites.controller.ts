import {
  Controller,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Post,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { TAlbumId } from 'src/album/album.model';
import { TArtistId } from 'src/artist/artist.model';
import { TTrackId } from 'src/track/track.model';
import { FavoriteService } from './favorites.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TTrackId) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TAlbumId) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId,
  ) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TTrackId) {
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: TAlbumId) {
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: TArtistId,
  ) {
    return this.favoriteService.deleteArtist(id);
  }
}
