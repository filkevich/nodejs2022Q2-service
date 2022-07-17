import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './tracks/track.module';

@Module({
  imports: [UsersModule, ArtistModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
