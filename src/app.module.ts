import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UsersModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
