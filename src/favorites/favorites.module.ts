import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
