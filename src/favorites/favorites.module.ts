import { Module } from '@nestjs/common';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
