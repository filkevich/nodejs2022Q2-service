import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UsersModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
