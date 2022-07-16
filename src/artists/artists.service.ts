import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { Artist, ArtistResponse } from './interfaces/artist.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdateArtistDto } from './dto/update.dto';
import { IMDBService } from 'src/db/in-memory-db.service';

@Injectable()
export class ArtistsService {
  private list: Artist[] = [];

  constructor(private db: IMDBService) {
    this.list = db.artists;
  }

  create(createArtistDto: CreateArtistDto): ArtistResponse {
    const artist: Artist = createArtistDto;
    artist.id = uuidv4();
    this.list.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponse {
    const artist = this.list.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    for (const [key, value] of Object.entries(updateArtistDto)) {
      if (value !== undefined) {
        artist[key] = value;
      }
    }
    return artist;
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('artist does not exist', HttpStatus.NOT_FOUND);
    }
    const itemInFavorouritesId = this.db.favourites.artistIds.findIndex(
      (item) => item === id,
    );
    if (itemInFavorouritesId >= 0) {
      this.db.favourites.artistIds.splice(itemInFavorouritesId, 1);
    }
    this.db.tracks.forEach((track) => {
      if (track.artistId == id) {
        track.artistId = null;
      }
    });
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getArtist(id: string): ArtistResponse {
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
