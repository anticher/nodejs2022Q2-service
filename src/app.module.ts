import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ArtistEntity } from './artists/entities/artist.entity';
import { TrackEntity } from './tracks/entities/track.entity';
import { AlbumEntity } from './albums/entities/album.entity';
import {
  FavouriteAlbumsEntity,
  FavouriteArtistsEntity,
  FavouriteTracksEntity,
} from './favourites/entities/favourite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserEntity,
        ArtistEntity,
        TrackEntity,
        AlbumEntity,
        FavouriteArtistsEntity,
        FavouriteAlbumsEntity,
        FavouriteTracksEntity,
      ],
      logging: true,
    }),
    DatabaseModule,
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
