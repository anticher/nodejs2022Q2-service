import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { IMDBService } from 'src/db/in-memory-db.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, IMDBService],
})
export class FavouritesModule {}
