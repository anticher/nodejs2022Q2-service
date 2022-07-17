import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMDBService } from 'src/db/in-memory-db.service';
import { Favourites, FavouritesRepsonse } from './interfaces/favourite';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class FavouritesService {
  private list: Favourites;

  constructor(private db: IMDBService) {
    this.list = db.favourites;
  }

  addArtist(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.db.artists.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException(
        'artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.list.artistIds.push(id);
    throw new HttpException(
      'artist was added to favourites',
      HttpStatus.CREATED,
    );
  }

  deleteArtist(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.list.artistIds = this.list.artistIds.filter((item) => item !== id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  addAlbum(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    const album = this.db.albums.find((item) => item.id === id);
    if (!album) {
      throw new HttpException(
        'album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.list.albumIds.push(id);
    throw new HttpException(
      'album was added to favourites',
      HttpStatus.CREATED,
    );
  }

  deleteAlbum(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('albumId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.list.albumIds = this.list.albumIds.filter((item) => item !== id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  addTrack(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    const track = this.db.tracks.find((item) => item.id === id);
    if (!track) {
      throw new HttpException(
        'track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.list.trackIds.push(id);
    throw new HttpException(
      'track was added to favourites',
      HttpStatus.CREATED,
    );
  }

  deleteTrack(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('trackId is invalid', HttpStatus.BAD_REQUEST);
    }
    this.list.trackIds = this.list.trackIds.filter((item) => item !== id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getAll(): FavouritesRepsonse {
    const result: FavouritesRepsonse = {
      artists: [],
      albums: [],
      tracks: [],
    };
    result.artists = this.list.artistIds.map((artistId) => {
      return this.db.artists.find((item) => item.id === artistId);
    });
    result.albums = this.list.albumIds.map((albumId) => {
      return this.db.albums.find((item) => item.id === albumId);
    });
    result.tracks = this.list.trackIds.map((trackId) => {
      return this.db.tracks.find((item) => item.id === trackId);
    });
    return result;
  }
}
