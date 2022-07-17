import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
