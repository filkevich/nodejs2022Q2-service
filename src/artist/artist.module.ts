import { Module, forwardRef } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoriteModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
