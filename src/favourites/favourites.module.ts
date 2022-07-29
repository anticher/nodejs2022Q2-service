import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { IMDBService } from 'src/db/in-memory-db.service';
import {
  FavouriteAlbumsEntity,
  FavouriteArtistsEntity,
  FavouriteTracksEntity,
} from './entities/favourite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavouriteArtistsEntity,
      FavouriteAlbumsEntity,
      FavouriteTracksEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
