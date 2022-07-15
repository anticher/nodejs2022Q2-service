import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { Artist, ArtistResponse } from './interfaces/artist.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdateArtistDto } from './dto/update.dto';

@Injectable()
export class ArtistsService {
  private list: Artist[] = [];

  create(createArtistDto: CreateArtistDto): ArtistResponse {
    if (!createArtistDto.name) {
      throw new HttpException(
        'artist does not contain required fields: name and grammy',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist: Artist = createArtistDto;
    artist.id = uuidv4();
    this.list.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponse {
    if (!isValidUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.list.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    artist.name = updateArtistDto.name ? updateArtistDto.name : artist.name;
    artist.grammy = updateArtistDto.grammy
      ? updateArtistDto.grammy
      : artist.grammy;
    return artist;
  }

  delete(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getArtist(id: string): ArtistResponse {
    if (!isValidUUID(id)) {
      throw new HttpException('artistId is invalid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.list.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  getAll(): ArtistResponse[] {
    return this.list;
  }
}
