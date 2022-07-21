import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [forwardRef(() => FavoriteModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
