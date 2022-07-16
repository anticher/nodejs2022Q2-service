import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album, AlbumResponse } from './interfaces/album.model';
import { IMDBService } from 'src/db/in-memory-db.service';

@Injectable()
export class AlbumsService {
  private list: Album[] = [];

  constructor(private db: IMDBService) {
    this.list = db.albums;
  }

  create(createAlbumDto: CreateAlbumDto): AlbumResponse {
    const album: Album = createAlbumDto;
    album.id = uuidv4();
    this.list.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumResponse {
    const album = this.list.find((item) => item.id === id);
    if (!album) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateAlbumDto)) {
      if (value !== undefined) {
        album[key] = value;
      }
    }
    return album;
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    this.db.favourites.albumIds.forEach((element, index) => {
      if (element === id) {
        this.db.favourites.albumIds.splice(index, 1);
      }
    });
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getAlbum(id: string): AlbumResponse {
    const album = this.list.find((item) => item.id === id);
    if (!album) {
      throw new HttpException('album does not exist', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  getAll(): AlbumResponse[] {
    return this.list;
  }
}
