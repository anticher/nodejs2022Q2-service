import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMDBService } from 'src/db/in-memory-db.service';
import { Favourites, FavouritesResponse } from './interfaces/favourite';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { isNotEmpty } from 'class-validator';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavouriteAlbumsEntity,
  FavouriteArtistsEntity,
  FavouriteTracksEntity,
} from './entities/favourite.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

@Injectable()
export class FavouritesService {
  private list: Favourites;

  constructor(
    @InjectRepository(FavouriteArtistsEntity)
    private favouriteArtistsRepository: Repository<FavouriteArtistsEntity>,

    @InjectRepository(FavouriteAlbumsEntity)
    private favouriteAlbumsRepository: Repository<FavouriteAlbumsEntity>,

    @InjectRepository(FavouriteTracksEntity)
    private favouriteTracksRepository: Repository<FavouriteTracksEntity>,

    @InjectRepository(ArtistEntity)
    private artistEntityRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumEntityRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private trackEntityRepository: Repository<TrackEntity>,
  ) {}

  async addArtist(id: string): Promise<FavouriteArtistsEntity> {
    const checkArtist = await this.artistEntityRepository.findOneBy({ id });
    if (!checkArtist) {
      throw new HttpException(
        'artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const artists = await this.favouriteArtistsRepository.findBy({
      artistId: id,
    });
    if (artists.length > 0) {
      throw new HttpException('artist already in favs', HttpStatus.CONFLICT);
    }
    const favourite = this.favouriteArtistsRepository.create({
      artistId: id,
    });
    await this.favouriteArtistsRepository.save(favourite);
    throw new HttpException(
      'artist was added to favourites',
      HttpStatus.CREATED,
    );
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.favouriteArtistsRepository.findOneBy({
      artistId: id,
    });
    if (!artist) {
      throw new HttpException('artist is not favourite', HttpStatus.NOT_FOUND);
    }
    await this.favouriteArtistsRepository.delete(artist.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async addAlbum(id: string): Promise<FavouriteAlbumsEntity> {
    const checkAlbum = await this.albumEntityRepository.findOneBy({ id });
    if (!checkAlbum) {
      throw new HttpException(
        'album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const albums = await this.favouriteAlbumsRepository.findBy({
      albumId: id,
    });
    if (albums.length > 0) {
      throw new HttpException('album already in favs', HttpStatus.CONFLICT);
    }
    const favourite = this.favouriteAlbumsRepository.create({
      albumId: id,
    });
    await this.favouriteAlbumsRepository.save(favourite);
    throw new HttpException(
      'album was added to favourites',
      HttpStatus.CREATED,
    );
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.favouriteAlbumsRepository.findOneBy({
      albumId: id,
    });
    if (!album) {
      throw new HttpException('album is not favourite', HttpStatus.NOT_FOUND);
    }
    await this.favouriteAlbumsRepository.delete(album.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async addTrack(id: string): Promise<FavouriteTracksEntity> {
    const checkTrack = await this.trackEntityRepository.findOneBy({ id });
    if (!checkTrack) {
      throw new HttpException(
        'track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const tracks = await this.favouriteTracksRepository.findBy({
      trackId: id,
    });
    if (tracks.length > 0) {
      throw new HttpException('track already in favs', HttpStatus.CONFLICT);
    }
    const favourite = this.favouriteTracksRepository.create({
      trackId: id,
    });
    await this.favouriteTracksRepository.save(favourite);
    throw new HttpException(
      'track was added to favourites',
      HttpStatus.CREATED,
    );
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.favouriteTracksRepository.findOneBy({
      trackId: id,
    });
    if (!track) {
      throw new HttpException('track is not favourite', HttpStatus.NOT_FOUND);
    }
    await this.favouriteTracksRepository.delete(track.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async getAll() {
    const ids = { artists: [], albums: [], tracks: [] };
    ids.artists = await this.favouriteArtistsRepository.find({});
    ids.artists = ids.artists
      .map((artist) => artist.artistId)
      .filter((id) => id !== null);
    ids.albums = await this.favouriteAlbumsRepository.find();
    ids.albums = ids.albums
      .map((album) => album.albumId)
      .filter((id) => id !== null);
    ids.tracks = await this.favouriteTracksRepository.find();
    ids.tracks = ids.tracks
      .map((track) => track.trackId)
      .filter((id) => id !== null);
    const result = { artists: [], albums: [], tracks: [] };
    result.artists = await Promise.all(
      ids.artists.map((id) => {
        return this.artistEntityRepository.findOneBy({
          id,
        });
      }),
    );
    result.albums = await Promise.all(
      ids.albums.map((id) => {
        return this.albumEntityRepository.findOneBy({
          id,
        });
      }),
    );
    result.tracks = await Promise.all(
      ids.tracks.map((id) => {
        return this.trackEntityRepository.findOneBy({
          id,
        });
      }),
    );
    return result;
  }
}
